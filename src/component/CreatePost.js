import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalState'

function CreatePost () {
  const { title, changeTitle } = useContext(GlobalContext)
  const { body, changeBody } = useContext(GlobalContext)
  const { file, changeFile } = useContext(GlobalContext)
  const { url, changeUrl } = useContext(GlobalContext)

  let handleForm = (value, type) => {
    if (type === 'title') {
      changeTitle(value)
    } else if (type === 'body') {
      changeBody(value)
    } else if (type === 'file') {
      changeFile(value[0])
    }
  }

  useEffect(() => {
    if (url) {
      axios({
        method: 'POST',
        url: '/createpost',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') },
        data: { title, body, url }
      })
        .then(res => {
          console.log(url, 'url??')
          console.log(res, 'res create post')
          console.log(localStorage.getItem('jwt'), 'bla.')
        })
        .catch(err => {
          console.log(err, 'err create post')
          console.log(localStorage.getItem('jwt'), 'bla.')
        })
    }
  }, [url])

  let postDetail = async e => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'insta-clone')
    data.append('cloud_name', 'cnq')
    axios
      .post('https://api.cloudinary.com/v1_1/dxnuy2qzm/image/upload', data)
      .then(res => {
        changeUrl(res.data.url)
      })
      .catch(err => console.log(err, 'err'))
  }

  return (
    <div>
      {title}
      <input
        type='text'
        placeholder='title'
        onChange={e => handleForm(e.target.value, 'title')}
      />
      <br />
      <input
        type='text'
        placeholder='body'
        onChange={e => handleForm(e.target.value, 'body')}
      />
      <br />
      <input type='file' onChange={e => handleForm(e.target.files, 'file')} />
      <br />
      <button onClick={postDetail}>submit post</button>
    </div>
  )
}

export default CreatePost
