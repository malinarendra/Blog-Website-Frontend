import React, { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

const getError = (message) => {
    return <p className='text-red-600 mt-2 mr-2'><span>*</span>{message}</p>
}

const BlogForm = () => {

    // getting user object from redux store
    const user = useSelector(state => state.user)

    // state for form input fields
    const [input, setInput] = useState(
        {
            title: "",
            tag: "",
            blogImage: null,
            content: "",
            status: "active"
        }
    )

    // state for error
    const [error, setError] = useState({
        title: false,
        tag: false,
        blogImage: false,
        content: false,
    })

    // state for loading
    const [loading, setLoading] = useState(false)

    // ref for form
    const formRef = useRef()

    // ref for input image field
    const imageRef = useRef()

    // handle input change
    const handleInputChange = (e) => {
        let { name, value } = e.target
        setInput((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    // handle input image change
    const handleImageChange = (e) => {
        setInput({ ...input, blogImage: e.target.files[0] })
    }

    // handle editor change
    const handleEditorChange = (content) => {
        setInput({ ...input, content })
    }

    // reset form
    const resetForm = () => {

        formRef.current.reset()// reseting Editor

        setInput({// reseting input object
            title: "",
            tag: "",
            blogImage: null,
            content: "",
            status: "active"
        })

        imageRef.current.value = null// reseting image


    }


    // function to check errors
    const checkError = () => {
        let hasError = false;

        for (let key in input) {
            if (input[key] === "" || input[key] === null) {
                setError((prevData) => ({
                    ...prevData,
                    [key]: true
                }));
                hasError = true;
            } else {
                setError((prevData) => ({
                    ...prevData,
                    [key]: false
                }));
            }
        }

        return hasError;
    };


    // save blog to database
    const createBlog = async (e) => {
        // prevent default behavior of form
        e.preventDefault()

        // checking error first
        if (checkError()) {// if true then error
            return;
        } else {
            let formData = new FormData();// creating new multipart form data
            for (let key in input) {
                formData.append(key, input[key])
            }
            formData.append("userId", user.data.id)
            formData.append("fname", user.data.fname)
            formData.append("lname", user.data.lname)
            try {
                setLoading(true)
                await fetch("http://localhost:3500/api/v1/blog", {
                    method: "POST",
                    body: formData
                })
                    .then((promise, err) => {
                        if (err) {
                            toast.error("Failed to post blog, try again later!")
                            setLoading(false)
                        }
                        return promise.json()
                    })
                    .then((data) => {
                        console.log(data)
                        toast.success("Blog posted successfully!")
                        resetForm()
                        setLoading(false)
                    })
            } catch (err) {
                toast.error("Internal error, try again later!")
            }
        }

    }


    return (
        <>
            <div className='relative'>
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-semibold my-8 text-center">Create Blog</h2>
                    <form ref={formRef} className="space-y-6">
                        {/* Blog Title */}
                        <div>
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={input.title}
                                onChange={handleInputChange}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter blog title"
                            />
                            {error.title ? getError("Title is required") : null}
                        </div>

                        {/* Tag */}
                        <div>
                            <label htmlFor="tag" className="block text-lg font-medium text-gray-700">Tag</label>
                            <input
                                type="text"
                                id="tag"
                                name="tag"
                                value={input.tag}
                                onChange={handleInputChange}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter tag"
                            />
                            {error.tag ? getError("Tag is required") : null}
                        </div>

                        {/* Blog Image */}
                        <div>
                            <label htmlFor="image" className="block text-lg font-medium text-gray-700">Blog Image</label>
                            <input
                                ref={imageRef}
                                type="file"
                                id="image"
                                name="blogImage"
                                multiple={false}
                                onChange={handleImageChange}
                                accept='.jpg, .jpeg, .avif'
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {error.blogImage ? getError("Image is required") : null}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={input.status}
                                onChange={handleInputChange}
                                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* TinyMCE Editor */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Content</label>
                            <Editor
                                apiKey={process.env.TINY_MCE_API_KEY}
                                init={{
                                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown textcolor colorpicker',
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | link table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                    ],
                                }}
                                onEditorChange={handleEditorChange}
                            />
                            {error.content ? getError("Blog content is required") : null}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={createBlog}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create Blog
                        </button>
                    </form>
                </div>
                {/* loading component */}
                {loading ?
                    <>
                        <div className='z-40 h-loading-screen bg-loading w-full absolute left-0 top-0 flex justify-center'>
                            <ReactLoading className='mt-60' type={"spinningBubbles"} color={"black"} height={50} width={50} />
                        </div>
                    </>
                    :
                    null}
            </div>
        </>
    )
}

export default BlogForm
