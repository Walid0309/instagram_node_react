import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SubscriberPost () {
  const [data, setData] = useState()

  useEffect(() => {
    getFollowingPost()
  }, [])

  const getFollowingPost = () => {
    axios({
      method: 'GET',
      url: '/getsubscriberspost',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    }).then(res => console.log(res, 'resultat??'))
  }
  return <div></div>
}

export default SubscriberPost
