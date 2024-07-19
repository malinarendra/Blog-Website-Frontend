import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Login from './component/Login'
import Signup from './component/Signup'
import About from './component/About'
import Contact from './component/Contact'
import Profile from './component/Profile'
import Home from './component/home/Home'
import Blogs from './component/Blogs'
import SingleBlog from './component/SingleBlog'
import BlogByCategory from './component/BlogByCategory'
import CreateBlog from './component/create-blog/CreateBlog'

const App = () => {
    return (
        <>
            <div className='w-5/6 mx-auto font-Poppins'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' Component={Login} />
                        <Route path="/signup" Component={Signup} />
                        <Route path="/home" Component={Home} />
                        <Route path='/profile' Component={Profile} />
                        <Route path="/blog/create" Component={CreateBlog} />
                        <Route path='/blogs' Component={Blogs} />
                        <Route path="/single-blog/:blogId" Component={SingleBlog} />
                        <Route path="/category/:category" Component={BlogByCategory} />
                        <Route path='/about' Component={About} />
                        <Route path='/contact' Component={Contact} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </div>
        </>
    )
}

export default App
