import React, { useEffect, useState, useContext} from 'react'
import Navbar from './Navbar'
import PictureFeed from '../molecule/PictureFeed'
import './Home.css'
import Loader from 'react-loader-spinner'
import {GlobalContext} from "../context/GlobalState"

function Home ({ history }) {
  const [isLoading, setIsLoading] = useState(true); 
  const { user, changeUser } = useContext(GlobalContext)

  useEffect(() => {
	let users = JSON.parse(localStorage.getItem('user'))
	console.log(users,"user in home")
    if (users) {
	  history.push('/')
	  changeUser(user); 
	  setIsLoading(false)
    } else {
	  history.push('/signin')
	  setIsLoading("false")
    }
  }, [])
  return isLoading ? (
    <div>
		  <Loader
         type="Puff"
         color="#00BFFF"
         height={600}
         width={600}
         timeout={3000} //3 secs
 
      />
	</div>
  ) : (
    <div>
      <Navbar />
      <div className='container_feed'>
        <PictureFeed />
      </div>
    </div>
  )
}

export default Home
