import React from 'react';
import {Container, Logo, TopLogo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)  // authStatus tells weather a user is logged in or logged out
    const navigate = useNavigate()

    const navItems = [  // an array is made for navigation bar. This array contains objects
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
      <header className='py-3 shadow bg-gray-500 font-semibold text-xl'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <div className='h-20 flex justify-center items-center'>
                  <TopLogo />
                </div>
              </Link>
            </div>
            <ul className='flex justify-center items-center ml-auto gap-2'>
              {navItems.map((item) => 
              item.active ? ( // item.active checks the authStatus of the item i.e true or false
                <li key={item.name}>
                  <button
                  onClick={() => navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 bg-orange-400 shadow-xl hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null  // if item.active is false then null
              )}
              {authStatus && ( // if authStatus is true then LogoutBtn is displayed
                <li className='bg-orange-400 shadow-xl rounded-full'>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    )
}

// function Header() {
//   return  <div>Header</div>
// }

export default Header;