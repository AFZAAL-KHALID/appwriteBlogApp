import React from 'react'
import {Container, LogoutBtn } from '../index'
import {  Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {
  const storeStatus = useSelector((state)=> state.auth.status)
  // const navigate = useNavigate() FIXME:  

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !storeStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !storeStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: storeStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: storeStatus,
  },
  ]


  return (
    <header className='py-3 shadow-md bg-gray-500/30'>
      <Container>
        <nav>
          <ul className="ml-[20%] flex gap-4">
          {navItems.map((item, index)=>(
            item.active &&
            <li key={index} className=''>
              <button 
              className='px-4 py-2 rounded-md hover:bg-green-400'
              onClick={()=>{navigate(item.slug)}}>{item.name}</button>
              </li>
          )
          )}
            {storeStatus && <LogoutBtn/>}
          </ul>


        </nav>
      </Container>
    </header>
  )
}

export default Header