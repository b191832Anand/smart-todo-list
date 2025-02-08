import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const val = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', val.data.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (e) {
      toast.error(e.response.data || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="p-8 bg-white m-4 sm:w-96 w-full rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-center font-semibold text-lg">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-lg font-medium">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 mt-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mt-2 w-full border border-gray-300 rounded-lg pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white w-full mt-3 px-2 py-2 rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
