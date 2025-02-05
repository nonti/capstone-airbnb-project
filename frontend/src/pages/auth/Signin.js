import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signupin.css';
import {setSignIn} from '../../redux/state';
import {  useDispatch } from 'react-redux';
const Signin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
  
      // Get data after fetching
      const signedIn = await response.json();
  
      // Dispatch the action only if we have the user and token
      if (signedIn && signedIn.user && signedIn.token) {
        // Set the login status in local storage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", signedIn.token);
         
        
        dispatch(
          setSignIn({
            user: signedIn.user,
            token: signedIn.token,
            role: signedIn.role
          })
        );
        localStorage.setItem("user", JSON.stringify(signedIn.user)); 
        if (signedIn.role === 'user') {
          navigate(`reservations/user/${signedIn.user._id}`);
        } else {
          navigate(`/dashboard`);
        }
        toast.success('Sign in successful, welcome!');
      } else {
        toast.error('Sign in failed, please try again');
      }
    } catch (err) {
      console.error(err);
      toast.error('Sign in failed, please try again');
    }
  };
  

  return (
    <div className='signin-signup-form'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="input-container">
          <input type="text" name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
          <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
          <button type='submit'>Sign in</button>
        </div>
        <Link to='/signup' className='link'>Don't have an account? <span>Sign up</span></Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signin;
