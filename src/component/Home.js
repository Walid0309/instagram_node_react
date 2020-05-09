import React, { useEffect, useState, useContext } from 'react'
import Navbar from './Navbar'
import PictureFeed from '../molecule/PictureFeed'
import './Home.css'
import Loader from 'react-loader-spinner'
import { GlobalContext } from '../context/GlobalState'
import axios from 'axios'

function Home ({ history }) {
  const [isLoading, setIsLoading] = useState(true)
  const { user, changeUser } = useContext(GlobalContext)
  const [data, setData] = useState()
  const [allUser,setAllUser] = useState()

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem('user'))
    console.log(users, 'user in home')
    if (users) {
      history.push('/')
      changeUser(user)
    } else {
      history.push('/signin')
    }
  }, [])

  useEffect(() => {
    getDataFromPost()
    getAllUser()
  }, [])

  const getDataFromPost = () => {
    axios({
      method: 'GET',
      url: '/allPost',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(res => {
        console.log(res.data,"res data")
        console.log(res.data.allpost, 'jtm')
        setData(res.data.allpost)
        setIsLoading(false)
      })
      .catch(err => console.log(err, 'err'))
  }

  const getAllUser = ()=>{
    axios({
      method: 'GET',
      url: '/user',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    }).then(result=>{console.log(result,'result');setAllUser(result.data)}).catch(err=>console.log(err))
  }

  return isLoading ? (
    <div>
      <Loader
        type='Puff'
        color='#00BFFF'
        height={600}
        width={600}
        timeout={3000} //3 secs
      />
    </div>
  ) : (
    <div>
      {console.log(data, 'data render')}
      <Navbar />
      <div className='container_feed'>
        <PictureFeed history={history} data={data} />
      </div>
      <h3>aller sur le profil de</h3>
        {allUser?.map((user,indes)=>{
          return(
            <div>
            <p><a href={`/profile/${user._id}`}>{user.name}</a></p>
            </div>
          )
        })}
    </div>
  )
}

export default Home
