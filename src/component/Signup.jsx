import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin, setUserData } from "../feature/user.js";
import ReactLoading from 'react-loading';

const Signup = () => {
    // dispatch 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // login state
    const [login, setSignupLogin] = useState(false);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null // Initially set to null
    });

    const imageRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [isProfileImageSelected, setIsProfileImageSelected] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' });  // Clear the error message for the field being edited
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profileImage: file });
                setIsProfileImageSelected(true);
                setErrors({ ...errors, profileImage: '' });  // Clear profile image error
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a JPEG or JPG image.');
        }
    };

    const validateStepOne = () => {
        const newErrors = {};
        if (!formData.fname) newErrors.fname = 'First name is required';
        if (!formData.lname) newErrors.lname = 'Last name is required';
        if (!isProfileImageSelected) newErrors.profileImage = 'Profile image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStepTwo = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStepOne()) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStepTwo()) {
            // Prepare form data
            const newFormData = new FormData();
            newFormData.append("fname", formData.fname);
            newFormData.append("lname", formData.lname);
            newFormData.append("email", formData.email);
            newFormData.append("password", formData.password);
            newFormData.append("profileImage", formData.profileImage);

            setSignupLogin(true);
            console.log([...newFormData])

            try {
                const response = await fetch("http://localhost:3500/api/v1/profile", {
                    method: 'POST',
                    body: newFormData
                });

                setSignupLogin(false);

                if (!response.ok) {
                    throw toast.error("Network response was not ok, try again later!");
                }

                const res = await response.json();

                if (res.success === true) {
                    dispatch(setLogin(true));
                    dispatch(setUserData(res.data));
                    localStorage.setItem("loginObj", JSON.stringify(res.data));
                    toast.success("Account created successfully!");
                    setFormData({
                        fname: '',
                        lname: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        profileImage: null 
                    })
                    navigate("/home");
                } else {
                    toast.error("Server error, try again later!");
                }
            } catch (error) {
                setSignupLogin(false);
                toast.error("Network error, try again later");
            }
        }
    };

    return (
        <section className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl mt-16 mb-8'>Sign up</h1>
            <div className='relative'>
                <form className='w-80 border border-gray-100 rounded-md p-6 shadow-2xl' onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <div className='flex justify-center items-center mb-7 relative'>
                                <img className='w-32 h-32 rounded-full' src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : '/images/profile.jpg'} alt="Profile" onClick={() => document.getElementById('fileInput').click()} />
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/jpeg, image/jpg"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    ref={imageRef}
                                />
                            </div>
                            {errors.profileImage && <span className='text-red-600'>{errors.profileImage}</span>}
                            <div className='flex flex-col mb-7'>
                                <label className='mb-4' htmlFor="fname">First Name</label>
                                <input
                                    id='fname'
                                    value={formData.fname}
                                    onChange={handleChange}
                                    className='border border-gray-700 rounded-md h-10 pl-4 focus:outline-blue-600 focus:border-none w-full'
                                    type="text"
                                />
                                {errors.fname && <span className='text-red-600'>{errors.fname}</span>}
                            </div>
                            <div className='flex flex-col mb-7'>
                                <label className='mb-4' htmlFor="lname">Last Name</label>
                                <input
                                    id='lname'
                                    value={formData.lname}
                                    onChange={handleChange}
                                    className='border border-gray-700 rounded-md h-10 pl-4 focus:outline-blue-600 focus:border-none w-full'
                                    type="text"
                                />
                                {errors.lname && <span className='text-red-600'>{errors.lname}</span>}
                            </div>
                            <div className='flex justify-between'>
                                <button type="button" className='h-10 text-white bg-blue-600 rounded-md flex justify-center items-center w-full' onClick={handleNext}>Next</button>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className='flex flex-col mb-7'>
                                <label className='mb-4' htmlFor="email">Email</label>
                                <input
                                    id='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className='border border-gray-700 rounded-md h-10 pl-4 focus:outline-blue-600 focus:border-none w-full'
                                    type="email"
                                />
                                {errors.email && <span className='text-red-600'>{errors.email}</span>}
                            </div>
                            <div className='flex flex-col mb-7'>
                                <label className='mb-4' htmlFor="password">Password</label>
                                <input
                                    id='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className='border border-gray-700 rounded-md h-10 pl-4 focus:outline-blue-600 focus:border-none w-full'
                                    type="password"
                                />
                                {errors.password && <span className='text-red-600'>{errors.password}</span>}
                            </div>
                            <div className='flex flex-col mb-7'>
                                <label className='mb-4' htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className='border border-gray-700 rounded-md h-10 pl-4 focus:outline-blue-600 focus:border-none w-full'
                                    type="password"
                                />
                                {errors.confirmPassword && <span className='text-red-600'>{errors.confirmPassword}</span>}
                            </div>
                            <div className='flex justify-between'>
                                <button type="button" className='h-10 text-white bg-blue-600 rounded-md flex justify-center items-center w-1/2 mr-2' onClick={handlePrevious}>Previous</button>
                                <button type="submit" className='h-10 text-white bg-blue-600 rounded-md flex justify-center items-center w-1/2'>Sign up</button>
                            </div>
                        </>
                    )}
                    <div className='flex flex-col items-center mt-4'>
                        <p className='mb-2'>or</p>
                        <NavLink className="underline underline-offset-4 text-blue-600 mb-2" to="/">Already have an account?</NavLink>
                    </div>
                </form>
                {
                    !login ? null :
                        <div className='z-20 absolute left-0 top-0 w-full h-full bg-loading flex justify-center items-center'>
                            <ReactLoading type={"balls"} color={"black"} height={40} width={40} />
                        </div>
                }
            </div>
        </section>
    );
};

export default Signup;
