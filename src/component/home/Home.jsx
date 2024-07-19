import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import CommonSection from './CommonSection';
import { category } from "./categories";
import Footer from "../Footer";
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user.login) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className='h-medium-screen flex justify-between items-center'>
        <aside className='w-1/2 *:my-12'>
          <h1 className='text-5xl font-semibold mt-0 leading-tight'>Share your thoughts with the world and inspire others!</h1>
          <p className='text-lg text-gray-500'>Discover insightful articles and thought-provoking content</p>
          <NavLink to="/blog/create" className="text-white font-semibold bg-red-500 py-3 px-5 rounded-md">Get Started</NavLink>
        </aside>
        <aside className='w-1/2 flex justify-end items-center'>
          <img className='w-3/4' src="/images/meeting.png" alt="meeting blog" />
        </aside>
      </section>

      {/* Featured Section */}
      <CommonSection title="Featured Articles" />

      {/* Blog Categories */}
      <section className='h-96 flex flex-col justify-center items-center'>
        <h1 className='text-center text-3xl font-bold mb-8'>Blog Categories</h1>
        <div className='flex flex-wrap justify-center'>
          {
            category.map((cat, i) => (
              <NavLink 
                key={i} 
                to={`${cat.link}`} 
                className="text-black font-semibold border border-gray-400 py-2 px-4 rounded-md m-4 hover:bg-red-400 hover:text-white hover:border-red-400 duration-200"
              >
                {cat.name}
              </NavLink>
            ))
          }
        </div>
      </section>

      {/* Latest Blog Posts */}
      <CommonSection title="Latest Posts" />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
