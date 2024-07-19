import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./Navbar.css"
import { toast } from "react-toastify"
import { setLogin, setUserData } from "../../feature/user.js"
import { capitalize } from '../Profile.jsx'

const Navbar = () => {
  // navigate for navigation by using useNavigate hook
  const navigate = useNavigate()

  // state for user profile data
  const user = useSelector(state => state.user)

  // useDispatch
  const dispatch = useDispatch()

  // function to logout user
  const logoutUser = async () => {
    await fetch("http://localhost:3500/api/v1/logout", {
      method: "GET"
    })
      .then((promise, err) => {
        if (err) {
          toast.error("Failed to logout!")
          return
        } else {
          return promise.json()
        }
      })
      .then((data) => {
        if (data.success) {
          toast.success("Logout successfully!")
          localStorage.removeItem("loginObj")
          dispatch(setLogin(false))
          dispatch(setUserData({}))
          navigate("/", { replace: true })
        } else {
          toast.error("Failed to logout!")
          return
        }
      })
  }

  return (
    <>
      <nav className='flex justify-between h-20 sticky top-0 z-40 bg-white'>
        {/* logo */}
        <div className='flex justify-center items-center'>
          <h1 className='text-3xl font-semibold'>Blogify</h1>
        </div>
        {/* middle navigation menu */}
        <ul className='flex justify-between items-center h-full *:mx-4 *:text-lg'>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        {/* profile */}
        <div className='flex flex-col relative'>
          <div className='h-full flex justify-center items-center'>
            <label htmlFor="profile-checkbox">
              {
                !user ?
                  <img className='size-11 rounded-full' src="/images/man_profile.avif" alt="profile avatar" /> :
                  <img className='size-11 rounded-full' src={`${user.data.image}`} alt="profile avatar" />
              }
            </label>
          </div>
          <input type="checkbox" className='peer hidden' id="profile-checkbox" />
          {user.login === false ? null :
            <div id='user-profile' className='hidden peer-checked:block  absolute top-20 -left-16 shadow-lg p-6 z-10 rounded-md bg-white'>
              <div className='mb-4 relative arrow-profile'>
                <h2 className='font-bold'>{`${capitalize(user.data.fname)} ${capitalize(user.data.lname)}`}</h2>
                <p><i>{`${user.data.email.slice(0, 14)}...`}</i></p>
              </div>
              <ul className='*:mb-2'>
                <li>
                  <NavLink className='text-blue-600 text-lg' to={`/profile`}>Profile</NavLink>
                </li>
                <li className='mb-0'>
                  <button onClick={logoutUser} className='text-red-600 text-lg'>Log out</button>
                </li>
              </ul>
            </div>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar
