import React, {useEffect} from 'react';
import Navbar from './Navbar/Navbar'
import { NavLink } from 'react-router-dom';
import Footer from "./Footer"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const About = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user.login === false) {
            navigate("/", {replace:true})
        }
    }, [user, navigate])
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4">
                <div className="text-center my-12">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-gray-600">
                        Discover the story behind our blog community, our mission, and what drives us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="flex justify-center">
                        <img
                            src="/images/our_mission.png"
                            alt="Community"
                            className="w-full"
                        />

                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-700 text-lg">
                            Our mission is to provide a platform where everyone can share their stories, insights, and ideas with the world. We believe in the power of words to inspire and connect people from all walks of life.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="order-last md:order-first flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold mb-4">Our Community</h2>
                        <p className="text-gray-700 text-lg">
                            We are proud of our vibrant and diverse community of writers, readers, and thinkers. Join us to express your creativity, connect with like-minded individuals, and grow your audience.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="/images/our_community.png"
                            alt="Blogging"
                            className="w-full h-auto"
                        />

                    </div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Become a part of our community. Create your own blog, share your stories, and connect with others.
                    </p>
                    <NavLink
                        to="/blog/create"
                        className="bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
                    >
                        Get Started
                    </NavLink>
                </div>
            </div>
            {/* footer */}
            <Footer />
        </>
    );
}

export default About;
