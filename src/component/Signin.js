import React, { useState, useContext } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { GlobalContext } from '../context/GlobalState'

function Signin ({ history }) {
  const { email, changeEmail } = useContext(GlobalContext)
  const { password, changePassword } = useContext(GlobalContext)
  const { user,changeUser } = useContext(GlobalContext)


  let handleForm = (value, type) => {
    if (type === 'email') {
      changeEmail(value)
    } else if (type === 'password') {
      changePassword(value)
    }
  }

  let postData = e => {
    e.preventDefault()
    axios
      .post('/signin', { email, password })
      .then(res => {
        console.log(res, 'res sign in ')
        localStorage.setItem('jwt', res.data.token)
        localStorage.setItem("user",JSON.stringify({email:res.data.email,name:res.data.name}))
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div>
      <Navbar />
      <form>
        <label>email</label>
        <br />
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={e => handleForm(e.target.value, 'email')}
        />
        <br />
        <label>password</label>
        <br />
        <input
          type='text'
          placeholder='password'
          value={password}
          onChange={e => handleForm(e.target.value, 'password')}
        />
        <br />
        <button onClick={postData}>se connecter</button>
        <h1>
          <Link to='/signup'>dont have an account?</Link>
        </h1>
      </form>
    </div>
  )
}

export default Signin
