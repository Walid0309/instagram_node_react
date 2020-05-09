import React, {useContext} from 'react'
import { BrowserRouter as Router, Link,useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { GlobalContext } from "../context/GlobalState"
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function Navbar () {
  const user = localStorage.getItem("user")
  const  history = useHistory()
  const classes = useStyles()
  const un = ()=>{
    if(!user){
      return(
        <>
          <Typography variant='h6' className={classes.title}>
                <li>
                  <Link to='/'>home</Link>
                </li>
          </Typography>
          <Typography variant='h6' className={classes.title}>
              <li>
                <Link to='/signin'>signin</Link>
              </li>
            </Typography>
            <Typography variant='h6' className={classes.title}>
              <li>
                <Link to='/signup'>signup</Link>
              </li>
            </Typography>
            </>
      )
    }else{
      return(
        <>
         <Typography variant='h6' className={classes.title}>
                <li>
                <Link to={user?'/':'/signin'}>home</Link>
                </li>
          </Typography>
        <Typography variant='h6' className={classes.title}>
        <li>
          <Link to='/profile'>profile</Link>
        </li>
      </Typography>
      <Typography variant='h6' className={classes.title}>
        <li>
          <Link to='/create'>create post</Link>
        </li>
        <button onClick={()=>{
          localStorage.clear();
          history.push("/signin")
        }}> LOG OUT</button>
      </Typography>
      </>
      )

    }
   
  }
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          {un()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
