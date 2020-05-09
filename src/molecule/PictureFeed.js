import React, { useState, useEffect } from 'react'
import './PictureFeed.css'
import axios from 'axios'

function PictureFeed ({ data, history }) {
  const [allPost, setAllPost] = useState(data)
  const [heart, setHeart] = useState(true)
  const [like, setLike] = useState(0)
  const [userID, setUser] = useState()
  const [comment, setComment] = useState()


  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem('user'))
    setUser(userInfo?.id)
  }, [userID])

  const addLike = postID => {
    console.log(postID, 'post id')
    axios({
      method: 'PUT',
      url: '/like',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      data: { postID }
    })
      .then(res => {
        console.log(res, 'res like')
        const verifyIfPostExist = allPost.map(allpost => {
          if (res.data.result._id === allpost._id) {
            return res.data.result
          } else {
            return allpost
          }
        })
        setAllPost(verifyIfPostExist)
      })
      .catch(err => console.log(err))
  }

  const removeLike = postID => {
    axios({
      method: 'PUT',
      url: '/unLike',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      data: { postID }
    })
      .then(res => {
        const verifyIfPostExist = allPost.map(allpost => {
          if (res.data.result._id === allpost._id) {
            return res.data.result
          } else {
            return allpost
          }
        })
        setAllPost(verifyIfPostExist)
      })
      .catch(err => console.log(err))
  }

  const handleComment = e => {
    setComment(e)
  }
  const addComment = postID => {
    axios({
      method: 'PUT',
      url: '/comment',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      data: { postID, text: comment }
    })
      .then(res => {
        const verifyIfPostExist = allPost.map(allpost => {
          if (res.data.result._id === allpost._id) {
            return res.data.result
          } else {
            return allpost
          }
        })
        setAllPost(verifyIfPostExist)
      })
      .catch(err => console.log(err))
    setComment('')
  }

  const deletePost = postID => {
    axios({
      method: 'DELETE',
      url: `/delete/${postID}`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    })
    .then(res => {
     const newData = allPost.filter(item=>{return item._id!==res._id})
      setAllPost(newData)
      window.location.reload();
    })
      .catch(err => console.log(err, 'error on client'))
  }

  // const deleteComment = commentID => {
  //   console.log(commentID, "comment id")
  //   axios({
  //     method: 'DELETE',
  //     url: `/delete/${commentID}`,
  //     headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
  //   })
  //   .then(res => {
  //    console.log(res,'response')
  //    window.location.reload();
  //   })
  //     .catch(err => console.log(err, 'error on client'))
  // }

  return (
    <div className='wrapper_img_feed'>
      {console.log(allPost, 'all post')}
      {allPost?.map((allpost, index) => {
        return (
          <div key={index}>
            <h3>{allpost?.postedBy?.name}</h3>
            <button
              onClick={() => {
                deletePost(allpost._id)
              }}
            >
              delete post
            </button>
            <img src={allpost.photo} alt='profile' className='img_feed' />
            <img
              src={heart ? 'heart_full.svg' : 'heart_empty.svg'}
              alt='heart for like'
            />
            {allpost.likes.includes(userID) ? (
              <button onClick={() => removeLike(allpost._id)}>unlike</button>
            ) : (
              <button onClick={() => addLike(allpost._id)}>like</button>
            )}
            <p>nombre de like</p>
            <span>{allpost?.likes?.length}</span>
            <p>{allpost.title}</p>
            <p>{allpost.body}</p>
            <input
              type='text'
              placeholder='add a comment'
              value={comment}
              onChange={e => handleComment(e.target.value)}
            />
            <button onClick={e => addComment(allpost._id)}>
              add a comment
            </button>
            <div>
              {allpost.comments.map(e => {
                return (
                  <div>
                    <span>{e.postedBy.name}</span>
                    {e.text}
                    {/* <button onClick={()=>deleteComment(e._id)}>delete com</button> */}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PictureFeed
