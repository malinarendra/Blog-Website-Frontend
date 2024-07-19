import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { NavLink } from 'react-router-dom';
import { BlogCard } from './home/CommonSection';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Blogs = () => {
  // checking login or not
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.login === false) {
      navigate("/", {replace:true})
    }
  }, [user, navigate])

  // search input field state
  const [searchTerm, setSearchTerm] = useState('');
  // state for handling empty input data
  const [error, setError] = useState('');
  // state for handling blog data
  const [blogs, setBlogs] = useState([])

  // function to get blogs from backend
  const getBlogs = async () => {
    await fetch("http://localhost:3500/api/v1/blogs", {
      method: "GET"
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
    user.login ? getBlogs() : navigate("/", { replace: true })
  }, [])


  // function to handle change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (error) {
      setError('');
    }
  };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (!searchTerm.trim()) {
  //     setError('Please enter a search term.');
  //     return;
  //   }

  //   // Perform search logic (dummy logic: filter blogs based on title containing search term)
  //   // const results = blogs.filter(blog =>
  //   //   blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   // );

  //   // setSearchResults(results);
  //   setError('');
  // };

  return (
    <>
      <Navbar />
      <div className="my-16 flex justify-between items-center">
        {/* Search Bar */}
        <form>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-96 pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Search blogs..."
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <NavLink to="/blog/create" className="text-white px-4 py-2 bg-red-500 rounded"><span className='mr-2 font-bold'>+</span>Create Blog</NavLink>
      </div>
      {/* Example of showing all blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.length === 0 ?
          <p className='text-red-500'>No blogs!</p>
          :
          blogs.map((blog, i) => {
            return <BlogCard key={i} blog={blog} />
          })
        }
      </div>
    </>
  );
};

export default Blogs;
