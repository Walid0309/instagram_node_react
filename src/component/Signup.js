import React, { useEffect, useContext, useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'
import { GlobalContext } from '../context/GlobalState'

function Signup ({ history }) {
  const { name, changeName } = useContext(GlobalContext)
  const { email, changeEmail } = useContext(GlobalContext)
  const { password, changePassword } = useContext(GlobalContext)
  const [image, setImage] = useState()
  const [url, setUrl] = useState()

  useEffect(() => {
    console.log('use effect avant')
    console.log(url, 'url')
    console.log(image, 'image')
    if (url) {
      uploadFields()
    }
    console.log('use effect apres')
  })

  const handleForm = (value, type) => {
    if (type === 'name') {
      changeName(value)
    } else if (type === 'email') {
      changeEmail(value)
    } else if (type === 'password') {
      changePassword(value)
    } else if (type === 'file') {
      setImage(value[0])
    }
  }

  let uploadPic = async e => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'insta-clone')
    data.append('cloud_name', 'cnq')
    axios
      .post('https://api.cloudinary.com/v1_1/dxnuy2qzm/image/upload', data)
      .then(res => {
        setUrl(res.data.url)
      })
      .catch(err => console.log(err, 'err'))
  }

  const uploadFields = e => {
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regexEmail.test(email)) {
      axios
        .post('/signup', { name, email, password, pic: url })
        .then(res => {
          console.log(res, 'res')
          M.toast({ html: res.data })
          history.push('/login')
        })
        .catch(err => {
          console.log(err, 'error')
          M.toast({ html: err })
        })
    } else {
      console.log("le format de l'email n'est pas bon ")
    }
  }

  const postData = e => {
    e.preventDefault()
    if (image) {
      uploadPic()
    } else {
      uploadFields()
    }
  }
  return (
    <div>
      <Navbar />
      <form>
        <label>name</label>
        <br />
        <input
          type='text'
          placeholder='name'
          value={name}
          onChange={e => {
            handleForm(e.target.value, 'name')
          }}
        />
        <br />
        <label>email</label>
        <br />
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={e => {
            handleForm(e.target.value, 'email')
          }}
        />
        <br />
        <label>password</label>
        <br />
        <input
          type='text'
          placeholder='password'
          value={password}
          onChange={e => {
            handleForm(e.target.value, 'password')
          }}
        />
        <br />
        <label>your profile picture</label>
        <br />
        <input type='file' onChange={e => handleForm(e.target.files, 'file')} />
        <br />
        <button onClick={postData}>s'inscrire</button>
        <h1>
          <Link to='/signin'>already have an account?</Link>
        </h1>
      </form>
    </div>
  )
}

export default Signup
