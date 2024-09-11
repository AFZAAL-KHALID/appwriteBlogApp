import React, { useState, useEffect  } from 'react'
import { useDispatch } from 'react-redux'
import {logIn, logOut} from './Store/Authslice'
import authservice from './appwriteServices/Auth_svc'
import {Header, Footer} from './Components/index'
import { Outlet } from 'react-router-dom'

const App = () => {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authservice.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        useDispatch(logIn({userData}))
      }else{
        useDispatch(logOut())
      }
    })
    .finally(() => {setloading(false)}
    )    
  }, [])
  

  return (
    !loading ? (
      <div className='min-h-screen w-full bg-red-500 flex flex-col justify-between text-white flex-wrap'>
        <Header/>
          {/* <Outlet/> */} TODO:
        <Footer/>
      </div>
    ) : (
      <h1 className='w-full h-screen flex justify-center items-center'>loading...</h1>
    )
  )
}

export default App