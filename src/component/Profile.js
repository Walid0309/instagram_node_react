import React, { Fragment, useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import './Profile.css'
import PictureProfile from '../molecule/PictureProfile'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalState'

function Profile () {
  const [profilePost, setProfilePost] = useState()
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPost()
    getUser()
  }, [])

  const getPost = () => {
    axios({
      method: 'GET',
      url: '/myPost',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(res => {
        console.log(res, 'res get post')
        setProfilePost(res.data.resp)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const getUser = async () => {
    let userID = await localStorage.getItem('user')
    let newUserID = JSON.parse(userID).id
    axios({
      method: 'GET',
      url: `/user/${newUserID}`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    }).then(res => {
      console.log(res, 'res')
      setUserData(res.data)
    })
  }

  return isLoading ? (
    <div>hello</div>
  ) : (
    <Fragment>
      <Navbar />
      {console.log(profilePost, 'all post render')}
      {console.log(userData, 'userdata')}
      <div className='wrapper_top_information'>
        <img src='images.jpg' alt='profile' className='profile_picture' />
        <div className='wrapper_name_follower'>
          <div>
            <h3>{profilePost[0]?.postedBy?.name}</h3>
            <span>{userData?.posts?.length}post</span>
            <span>{userData?.user?.followers.length}follower</span>
            <span>{userData?.user?.following.length}following</span>
          </div>
        </div>
      </div>
      <div className='feed_picture'>
        {profilePost.map((e, index) => {
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

export default Profile
