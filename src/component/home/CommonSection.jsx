import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { capitalize } from '../Profile';
import { useSelector } from 'react-redux';

// function to get date in proper format
const getDate = (dateString) => {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Define an array of month names
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Get the day of the month
    const day = date.getDate();

    // Get the month name from the months array
    const month = months[date.getMonth()];

    // Get the full year
    const year = date.getFullYear();

    // Get the ordinal suffix for the day (st, nd, rd, th)
    const getOrdinalSuffix = (n) => {
        if (n > 3 && n < 21) return 'th'; // special case for 11-20
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const dayWithSuffix = day + getOrdinalSuffix(day);

    // Return the formatted date string
    return `${dayWithSuffix} ${month} ${year}`;
};

const BlogCard = (props) => {
    return (
        <>
            <NavLink to={`/single-blog/${props.blog.id}`} className="flex justify-center items-center">
                <div className="bg-white rounded shadow w-64 h-80 cursor-pointer">
                    <div className='flex h-40 items-center justify-center overflow-hidden'>
                        <img className="h-full w-full rounded-tl-md rounded-tr-md" src={`${props.blog.blogImageUrl}`} alt="blog picturee" />
                    </div>
                    <div className="p-2 flex flex-col">
                        <p className="mb-1 text-sm text-gray-600">{`${getDate(props.blog.dateCreated)}`}</p>
                        <h3 className="mb-2 cursor-pointer text-lg font-semibold">{props.blog.title.length > 60 ? `${props.blog.title.slice(0, 50)}...` : props.blog.title}</h3>

                        <p>{`${capitalize(props.blog.fname)} ${capitalize(props.blog.lname)}`}</p>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

const CommonSection = (props) => {
    let { title } = props
    let user = useSelector(state => state.user)
    let [blogs, setBlogs] = useState([])

    // function to get blogs from backend
    const getBlogs = async () => {
        await fetch("http://localhost:3500/api/v1/blogs", {
            method: "GET"
        })
            .then((promise, err) => {
                if (err) {
                    setBlogs([])
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
        user.login ? getBlogs() : setBlogs([])
    }, [user])

    return (
        <>
            <section className='h-100 flex flex-col justify-center'>
                <h1 className='text-3xl font-semibold mb-8'>{title}</h1>
                <div className='flex justify-between  w-full'>
                    <div className='grid grid-cols-4 gap-x-8'>
                        {
                            blogs.slice(0, 4).map((blog, i) => {
                                return <BlogCard blog={blog} key={i} />
                            })
                        }
                    </div>
                    <div className='h-80 flex justify-center items-center'>
                        <NavLink className="text-blue-500 underline underline-offset-4" to="/blogs">See More</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CommonSection
export { BlogCard, getDate }
