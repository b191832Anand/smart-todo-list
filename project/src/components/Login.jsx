import { React, useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const val = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', val.data.token);
      console.log(val);
      toast.success("login successful")
      navigate('/dashboard')
    } catch (e) {
      console.log(e);
      toast.error(e.response.data);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200'>
      <div className='p-8 bg-white m-4 sm:w-96 w-full rounded-lg shadow-lg border-black'>
        <h1 className='text-center font-semibold text-lg'>Login</h1>
        <form action="" className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className='block text-lg font-medium'>Email</label>
            <input
              type="text"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-1 mt-2 w-full border border-gray-300 rounded-lg'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label htmlFor="password" className='block text-lg font-medium'>Password</label>
            <input
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-1 mt-2 w-full border border-gray-300 rounded-lg'
              placeholder='Enter your password'
            />
          </div>
          <div className='flex items-center space-x-1'>
            <p>Don't Have an Account? </p>
            <Link to='/signup' className='text-blue-600 hover:underline'>Signup</Link>
          </div>
          <div className='text-center'>
            <button type='submit' className='bg-blue-400 w-full mt-3 px-2 py-2 rounded-lg'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
