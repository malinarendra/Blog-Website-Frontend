import React from 'react'

const Footer = () => {
    return (
        <footer className='grid grid-cols-2 font-Poppins bg-gray-100 px-4 pt-4'>
            <div className='*:mb-5'>
                <h2 className='text-2xl font-semibold'>Contact</h2>
                <p className='text-lg'>Any question? Contact us here or mail: <a href="mailto:blogify@gmail.com">blogify@gmail.com</a></p>
                <div className='*:mr-4 *:text-3xl *:text-gray-500 *:cursor-pointer *:duration-300'>
                    <i className='bx bxl-linkedin-square'></i>
                    <i className='bx bxl-facebook-square' ></i>
                    <i className='bx bxl-twitter'></i>
                </div>
            </div>

            <div className='*:mb-7'>
                <h2 className='text-2xl font-semibold'>Newsletter</h2>
                <p className='text-lg'>Stay informed and never miss out on the latest news, updates, and special offers by subscribing to our newsletter.</p>
                <form>
                    <div className='h-12 flex'>
                        <input className='h-full w-80 px-2 border border-gray-400 focus-within:outline-none placeholder:text-black text-black' type="email" placeholder='Enter your email address' />
                        <button className='h-full bg-blue-500 text-white py-4 px-8 flex justify-center items-center'>Subscribe</button>
                    </div>
                </form>
            </div>
        </footer>
    )
}

export default Footer
