import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setUserData } from "../feature/user.js"
import ReactLoading from 'react-loading';

const ErrorMessage = (field) => {
  return <p className='text-red-500'><span className='mr-2'>*</span>{field} is required</p>
}

const Login = () => {
  // dispatch for seting user data and login
  const dispatch = useDispatch()

  // useSelector for getting login true or false 
  const user = useSelector(state => state.user)

  // useNavigator hook to redirect to home page
  const navigate = useNavigate()

  // useEffect to get login object from localstorage
  useEffect(() => {
    if (user.login === true) {
      navigate("/home")
    }
  }, [])

  // login state
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // error state
  const [errors, setErrors] = useState({
    username: false,
    password: false
  });

  // loading state
  const [loading, setLoading] = useState(false)

  // handling input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // validating form
  const validateForm = () => {

    let tempErrors = { ...errors }// updating states in react is asynchronous thats why handling errors in form here than after at all real error object will get update

    let flag = false // means no error

    for (let key in tempErrors) {
      if (formData[key] === '') {
        tempErrors[key] = true
        flag = true //setting there is error
      } else {
        tempErrors[key] = false
      }
    }
    setErrors(tempErrors)
    return flag
  };

  // function to handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // preventing default behavior of login form
    if (validateForm()) {// true-> means there are errors
      return;
    } else {
      setLoading(true)
      try {
        // if data is x-www-form-urlencoded type then we need to first convert it into that form thats why I used URLSearchParams here
        let urlEncodedData = new URLSearchParams()
        urlEncodedData.append('username', formData.username)
        urlEncodedData.append('password', formData.password)
        await fetch("http://localhost:3500/api/v1/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlEncodedData.toString()
          }
        )
          .then((promise, err) => {
            if (err) {
              setLoading(false)
              toast.error("Server not responding, try again later!")
              return;
            } else {
              setLoading(false)
              return promise.json()
            }
          })
          .then((res) => {
            if (res.success === false) {
              // success: false
              // 1. username not found
              // 2. password is not correct
              toast.error(res.message)
              return
            } else {
              // success:true
              // 1. login success
              dispatch(setLogin(true))// setting login state to true in redux store
              dispatch(setUserData(res.data))// setting user data in redux store
              let loginObj = {
                login: true,
                data: res.data
              }
              localStorage.setItem('loginObj', JSON.stringify(loginObj))
              toast.success("Login successful!")
              navigate("/home")// redirecting to home page
            }


          })
      } catch (e) {
        toast.error("Login error, try again later!")
      }
    }
  };

  return (
    <>
      <section className='flex flex-col  items-center'>
        <h1 className='text-2xl mt-28 mb-8'>Login</h1>
        <div className='w-80 relative'>
          <form className='z-10 w-full border border-gray-100 rounded-md p-6 shadow-2xl' onSubmit={handleLogin}>
            <div className='flex flex-col mb-7'>
              <label className='mb-4' htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                className='border border-gray-700 rounded-md h-10 pl-4 focus-within:outline-blue-600 focus-within:border-none w-full'
                type="email"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username ? ErrorMessage("Username") : null}
            </div>
            <div className='flex flex-col mb-7'>
              <label className='mb-4' htmlFor="password">Password</label>
              <input
                id='password'
                name='password'
                className='border border-gray-700 rounded-md h-10 pl-4 focus-within:outline-blue-600 focus-within:border-none w-full'
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password ? ErrorMessage("Password") : null}
            </div>
            <div className='flex flex-col items-center'>
              <button className='h-10 text-white bg-blue-600 rounded-md flex justify-center items-center w-full mb-2'>Login</button>
              <p className='mb-2'>or</p>
              <NavLink className="underline underline-offset-4 text-blue-600 mb-2" to="/signup">Create Account</NavLink>
            </div>
          </form>
          {
            !loading ? null :
              <div className='z-20 absolute left-0 top-0 w-full h-full bg-loading flex justify-center items-center'>
                <ReactLoading type={"balls"} color={"black"} height={40} width={40} />
              </div>
          }
        </div>
      </section>
    </>
  );
}

export default Login;
