import React, { useEffect } from 'react'
import './App.css'
import Home from './component/Home'
import Signup from './component/Signup'
import Signin from './component/Signin'
import Profile from './component/Profile'
import CreatePost from './component/CreatePost'
import { GlobalProvider } from './context/GlobalState'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'

function App () {
  return (
    <div className='App'>
      <GlobalProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/create' component={CreatePost} />
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  )
}

export default App
