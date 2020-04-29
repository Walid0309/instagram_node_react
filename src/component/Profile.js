import React, { Fragment } from 'react'
import Navbar from './Navbar'
import './Profile.css'
import PictureProfile from '../molecule/PictureProfile'

function Profile () {
  return (
    <Fragment>
      <Navbar />
      <div className='wrapper_top_information'>
        <img src='images.jpg' alt='profile' className='profile_picture' />
        <div className='wrapper_name_follower'>
          <h3>name</h3>
          <span>post</span>
          <span>follower</span>
          <span>following</span>
        </div>
      </div>
      <div className='feed_picture'>
        <PictureProfile />
        <PictureProfile />
      </div>
    </Fragment>
  )
}

export default Profile
