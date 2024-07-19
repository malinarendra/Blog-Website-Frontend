import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import BlogForm from './BlogForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateBlogPage = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user.login){
            navigate("/",{replace:true})
        }
    },[user])

    return (
        <>
            <Navbar />
            <BlogForm/>
        </>
    );
};

export default CreateBlogPage;
