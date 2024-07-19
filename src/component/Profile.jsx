import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getDate } from "./home/CommonSection"

const capitalize = (name) => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

// blog card
const BlogCardEditDelete = (props) => {
    return (
        <>
            <div className="flex justify-center items-center group w-64 h-80">
                <div className='relative w-full h-full'>
                    <NavLink to={`/single-blog/${props.blog.id}`} className="bg-white rounded shadow cursor-pointer w-full h-full">
                        <div className='flex h-40 items-center justify-center overflow-hidden'>
                            <img className="h-full w-full rounded-tl-md rounded-tr-md" src={`${props.blog.blogImageUrl}`} alt="blog picturee" />
                        </div>
                        <div className="p-2 flex flex-col">
                            <p className="mb-1 text-sm text-gray-600">{`${getDate(props.blog.dateCreated)}`}</p>
                            <h3 className="mb-2 cursor-pointer text-lg font-semibold">{props.blog.title.length > 60 ? `${props.blog.title.slice(0, 50)}...` : props.blog.title}</h3>

                            <p>{`${capitalize(props.blog.fname)} ${capitalize(props.blog.lname)}`}</p>
                        </div>
                    </NavLink>
                    {/* delete and edit icons */}
                    <div className='z-50 group-hover:block hidden  absolute top-4 right-4 bg-white px-2 py-1 *:text-2xl *:cursor-pointer duration-75'>
                        {/* edit */}
                        <i className='text-blue-500 hover:scale-125 duration-150 bx bxs-edit'></i>
                        {/* delete */}
                        <i className='text-red-500 hover:scale-125 duration-150 ml-4 bx bxs-trash-alt' onClick={() => props.deleteUI(props.blog.id, props.blog.imagePublicId)}></i>
                    </div>
                </div>
            </div>
        </>
    )
}


const Profile = () => {

    // state for delete loading
    const [deleteLoading, setDeleteLoading] = useState(false)

    // checking login or not
    const navigate = useNavigate()

    // state for deleting blog post
    const [deletePost, setDeletePost] = useState(false)

    const [loading, setLoading] = useState(false)

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.login === false) {
            navigate("/", { replace: true })
        }
    }, [user, navigate])

    // state for getting blogs from backend
    const [blogs, setBlogs] = useState([])

    // function to get blogs from backend
    const getBlogs = async () => {

        let urlEncoded = new URLSearchParams()
        urlEncoded.append('userId', user.data.id)

        setLoading(true)
        await fetch("http://localhost:3500/api/v1/blogs-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlEncoded.toString()
        })
            .then((promise, err) => {
                setLoading(false)
                if (err) {
                    setBlogs([])
                    toast.err("Network error, try again later!")
                } else {
                    return promise.json()
                }
            })
            .then((res) => {
                console.log(res.data)
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

    // delete blogId and imagePublicId state
    const [deleteCredintianls, setDeleteCredintials] = useState({
        blogId: null,
        imagePublicId: null
    })

    // function to delete blog
    const deleteBlog = async (action) => {
        switch (action) {
            case "delete":
                setDeleteLoading(true)
                let urlEncoded = new URLSearchParams()
                urlEncoded.append('blogId', deleteCredintianls.blogId)
                urlEncoded.append("imagePublicId", deleteCredintianls.imagePublicId)
                await fetch("http://localhost:3500/api/v1/blog", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: urlEncoded.toString()
                })
                    .then((promise, err) => {
                        setDeleteLoading(false)
                        if (err) {
                            toast.error("Network error, try again later!")
                            return
                        } else {
                            return promise.json()
                        }
                    })
                    .then((res) => {
                        if (res.success === true) {
                            toast.success("Blog deleted successfully!")
                            setDeleteCredintials({ blogId: null, imagePublicId: null })
                            setDeletePost(false)
                            getBlogs()
                            return
                        } else {
                            console.log(res.message)
                            toast.error("An error occured while deletion of blog, try again later!")
                            setDeletePost(false)
                            return
                        }
                    })

                console.log(deleteCredintianls)
                setDeletePost(false)
                break
            case "cancle":
                setDeletePost(false)
                break
            default:
                setDeleteCredintials({ blogId: null, imagePublicId: null })
                setDeletePost(false)
        }
    }

    // deleteUI function
    const deleteUI = (blogId, imagePublicId) => {
        setDeleteCredintials({ blogId, imagePublicId })
        setDeletePost(true)
    }

    return (
        <>
            <Navbar />
            <div className="max-w-8xl mx-auto px-4 py-8 relative">
                <div className="grid grid-cols-1 w-full">
                    {/* Profile Info */}
                    <div className="bg-gray-100 rounded w-full px-8 py-8">
                        <div className="flex items-center">
                            <img
                                src={user.data.image}
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            {
                                user.login === false ? null : <div className='ml-4'>
                                    <h2 className="text-xl font-semibold">{capitalize(user.data.fname)} {capitalize(user.data.lname)}</h2>
                                    <p className="text-gray-500">{user.data.email}</p>
                                </div>
                            }
                        </div>
                        <div className='flex'>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
                            >
                                Edit Profile
                            </button>

                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mt-6 ml-6"
                            >
                                Delete Profile
                            </button>
                        </div>
                    </div>

                </div>
                {/* User's Blogs */}
                <div className="mt-8">
                    <div className='my-8 flex justify-between items-center'>
                        <h3 className="text-2xl font-semibold">Your Blogs</h3>
                        <NavLink to="/blog/create" className="text-white px-4 py-2 bg-red-500 rounded"><span className='mr-2 font-bold'>+</span>Create Blog</NavLink>
                    </div>
                    {loading ? <ReactLoading className='text-center w-full' type={"balls"} color={"black"} height={40} width={40} /> :
                        <div className="grid grid-cols-4 gap-6">
                            {blogs.length === 0 ?
                                <p className='text-red-500 text-center text-xl'>No blogs!</p>
                                :
                                blogs.map(blog => (
                                    <BlogCardEditDelete key={blog.id} blog={blog} deleteUI={deleteUI} />
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
            {
                !deletePost ? null :
                    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-loading z-50'>
                        <div className='bg-white rounded-md p-6 w-72 relative'>
                            <div className='w-full'>
                                <p className='mb-2 text-lg'>Do you really want to delete blog post?</p>
                                <div className='flex justify-between items-center mt-4'>
                                    <button className='bg-red-500 px-4 py-2 text-white rounded-md' onClick={() => deleteBlog("delete")}>Delete</button>
                                    <button className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={() => deleteBlog("cancel")}>Cancel</button>
                                </div>
                            </div>
                            {
                                !deleteLoading ? null :
                                    <div className='absolute top-0 left-0 w-full h-full bg-loading flex justify-center items-center'>
                                        <ReactLoading className='text-center w-full' type={"balls"} color={"black"} height={40} width={40} />
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default Profile;
export { capitalize }