import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // now when the application loads, useEffect comes into picture & it tells us weather the user is logged in or logged out
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {   // we get 'data' from the getCurrentUser method & that 'data' is then dispatched into login 
      if(userData){ // if we get data then we call dispatch
        dispatch(login({...userData}))
        //console.log(userData.$id);
      }
      else{  // if we don't get any data from getCurrentUser then we call logout so that our state is updated by the logout method
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))  // finally always runs after .then or .catch
  }, [])

 if(loading){ // if loading is true
  return null
 }
 else{
  return(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          Todo: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )  
 }
}

export default App
