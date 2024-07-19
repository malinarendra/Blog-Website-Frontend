import React, { useState, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { capitalize } from './Profile'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BlogCard } from './home/CommonSection'


const BlogByCategory = () => {
  const navigate = useNavigate()
  const { category } = useParams()
  const user = useSelector(state => state.user)
  // state for blogs
  const [blogs, setBlogs] = useState([])

  // function to get blogs from backend
  const getBlogs = async () => {

    let urlEncoded = new URLSearchParams()
    urlEncoded.append('tagName', category)

    await fetch("http://localhost:3500/api/v1/blogs-tag-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlEncoded.toString()
    })
      .then((promise, err) => {
        if (err) {
          setBlogs([])
          toast.err("Network error, try again later!")
        } else {
          return promise.json()
        }
      })
      .then((res) => {
        setBlogs(res.data)// setting blogs comes from backend
      })
  }

  // useEffect for calling getBlogs function
  useEffect(() => {
    if (user.login === true) {
      getBlogs()
    } else {
      navigate("/", { replace: true })
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='my-8'>
        <h1 className='text-2xl'>Results for <span className='text-blue-500'>"{capitalize(category)}"</span></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
          {
            blogs.length === 0 ? <p className='text-center text-xl text-red-500 w-full my-8'>No blogs found!</p> :
              blogs.map((blog, i) => {
                return <BlogCard blog={blog} key={i} />
              })
          }
        </div>
      </div>
    </>
  )
}

export default BlogByCategory
