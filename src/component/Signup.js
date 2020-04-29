import React, { useEffect, useContext } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'
import { GlobalContext } from '../context/GlobalState'

function Signup ({ history }) {
  const { name, changeName } = useContext(GlobalContext)
  const { email, changeEmail } = useContext(GlobalContext)
  const { password, changePassword } = useContext(GlobalContext)

  const handleForm = (e, type) => {
    if (type === 'name') {
      changeName(e)
    } else if (type === 'email') {
      changeEmail(e)
    } else if (type === 'password') {
      changePassword(e)
    }
  }

  const postData = e => {
    e.preventDefault()
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regexEmail.test(email)) {
      axios
        .post('/signup', { name, email, password })
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
        <button onClick={postData}>s'inscrire</button>
        <h1>
          <Link to='/signin'>already have an account?</Link>
        </h1>
      </form>
    </div>
  )
}

export default Signup
