import React, { Fragment, useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import './Profile.css'
import PictureProfile from '../molecule/PictureProfile'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalState'
import { useParams } from 'react-router-dom'
import './UserProfile.css'

function UserProfile () {
  const { profilePost, changeProfilePost } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setProfile] = useState()
  let { profileID } = useParams()

  useEffect(() => {
    getData()
    getMyPost()
    setIsLoading(false)
  }, [])

  const getData = () => {
    axios({
      method: 'GET',
      url: `/user/${profileID}`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    }).then(res => setProfile(res.data))
  }

  const getMyPost = () => {
    axios({
      method: 'GET',
      url: '/myPost',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(res => {
        changeProfilePost(res.data.resp)
      })
      .catch(err => console.log(err))
  }

  const follow = followID => {
    axios({
      method: 'PUT',
      url: '/follow',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      data: { followID }
    })
      .then(res => {
        console.log(res, 'res')
        setProfile(prevState => {
          console.log(prevState, 'prevstate')
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, res.data._id]
            }
          }
        })
      })
      .catch(err => console.log(err, 'error on client'))
  }

  const unFollow = followID => {
    axios({
      method: 'PUT',
      url: '/unfollow',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
      data: { followID }
    })
      .then(res => {
        console.log(res, 'res')
        setProfile(prevState => {
          console.log(prevState, 'prevState')
          let newFollower = prevState.user.followers.filter(
            e => e !== res.data._id
          )
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            }
          }
        })
      })
      .catch(err => console.log(err, 'error on client'))
  }

  return isLoading ? (
    <div>hello</div>
  ) : (
    <Fragment>
      <Navbar />
      {console.log(userProfile, 'userProfile')}

      <div className='wrapper_top_information'>
        <img src='images.jpg' alt='profile' className='profile_picture' />
        <div className='wrapper_name_follower'>
          <div>
            <h3>{userProfile?.user?.name}</h3>
            <div className='info_profile'>
              <span>{userProfile?.posts?.length}post</span>
              <span>{userProfile?.user.followers.length} followers</span>
              <span>{userProfile?.user.following.length} following</span>
            </div>
            <button onClick={() => follow(userProfile.user._id)}>follow</button>
            <button onClick={() => unFollow(userProfile.user._id)}>
              unfollow
            </button>
          </div>
        </div>
      </div>
      <div className='feed_picture'>
        {userProfile?.posts.map((e, index) => {
          return (
            <PictureProfile
              key={index}
              img={e.photo}
              body={e.body}
              title={e.title}
            />
          )
        })}
      </div>
    </Fragment>
  )
}

export default UserProfile
