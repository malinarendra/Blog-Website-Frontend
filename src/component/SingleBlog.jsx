import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { capitalize } from './Profile';
import { getDate } from './home/CommonSection';
import { NavLink } from 'react-router-dom';

const SingleBlog = () => {
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)

  const getBlogDetails = async () => {
    let urlEncoded = new URLSearchParams()
    urlEncoded.append("blogId", blogId)
    await fetch("http://localhost:3500/api/v1/blogs-single", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlEncoded.toString()
    })
      .then((promise, err) => {
        if (err) {
          setBlog(null)
        } else {
          return promise.json()
        }
      })
      .then((res) => {
        setBlog(res.data[0])
      })
  }

  useEffect(() => {
    getBlogDetails()
  }, [])

  return (
    <>
      <Navbar />
      {
        blog === null ? <p>Can't load data please refresh!</p> :
          <div className="w-3/4 mx-auto my-8 p-6">
            <div className="z-10 flex justify-between items-center my-6 sticky top-20 left-0 bg-white">
              <div>
                <h1 className="text-4xl font-bold mb-1">{blog.title}</h1>
                <p className="text-gray-600 my-2">Published by <span className="font-medium text-blue-600">{`${capitalize(blog.fname)} ${capitalize(blog.lname)}`}</span> on {`${getDate(blog.dateCreated)}`}</p>
              </div>
            </div>
            <div className="mb-6">
              <img src={`${blog.blogImageUrl}`} alt="Blog" className="w-full h-96 rounded-lg mb-4" />
              <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }}>
              </div>
              <div className='my-4'>
                <p className='text-2xl mb-2 text-gray-600'>Related Tag</p>
                <NavLink to={`/category/${blog.tag}`} className="text-blue-500 underline underline-offset-4 text-lg">{capitalize(blog.tag)}</NavLink>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default SingleBlog;
