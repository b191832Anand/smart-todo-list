import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', { username, email, password });
      toast.success('Signup successful');
      navigate('/login');
    } catch (e) {
      toast.error(e.response.data || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen">
      <div className="p-8 m-2 sm:w-96 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <p className="text-center text-lg font-semibold">Signup</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-lg block font-semibold">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              className="mt-1 px-2 py-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-lg block font-semibold">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              className="mt-1 px-2 py-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg block font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                className="mt-1 px-2 py-2 w-full border border-gray-300 rounded-lg pr-10"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
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
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
          <button type="submit" className="mt-2 w-full px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
