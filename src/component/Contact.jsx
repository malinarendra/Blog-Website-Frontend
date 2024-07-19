import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Contact = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.login === false) {
      navigate("/")
    }
  }, [user, navigate])

  // State variable for form data and errors
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    // If there are errors, set them in state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, submit the form (you can add your submission logic here)
    console.log('Form submitted:', formData);

    // Reset form fields and errors after submission (if needed)
    setFormData({
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Contact us via email, phone, or visit our office. Follow us on social media for updates. We're here to help!</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.email ? 'border-red-500' : ''}`}
                placeholder="johndoe@gmail.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.subject ? 'border-red-500' : ''}`}
                placeholder="Let us know how we can help you"
              />
              {errors.subject && (
                <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea
                id="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${errors.message ? 'border-red-500' : ''}`}
                placeholder="Leave a comment..."
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">{errors.message}</p>
              )}
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none bg-blue-500 text-white">Send message</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
