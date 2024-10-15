import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signupin.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    profileImg: null, // Initialize the profileImg to handle the file
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImg') {
      setFormData({
        ...formData,
        profileImg: files[0], // Set the file directly
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupForm = new FormData();
      // Append all form data
      for (let key in formData) {
        signupForm.append(key, formData[key]); // Append each key-value pair
      }
      
      const response = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: 'POST',
        body: signupForm, // Use FormData directly without stringify
      });

      if (response.ok) {
        navigate('/signin');
        toast.success('Signup successful, you can now sign in');
      } else {
        const errorData = await response.json();
        toast.error(`Signup failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className='signin-signup-form'>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="input-container">
          <input
            type="text"
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name='profileImg' 
            accept="image/*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name='role'
            placeholder='Role'
            value={formData.role}
            onChange={handleChange}
            required
          />
          
          <button type='submit'>Sign up</button>
        </div>
        <Link to='/signin' className='link'>Already have an account? <span>Sign in</span></Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
