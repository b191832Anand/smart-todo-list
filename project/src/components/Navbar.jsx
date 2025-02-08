import { React, useState, useEffect } from 'react';
import { Link,Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [val, setVal] = useState(true);
  const navigate=useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setVal(false);
    }
  }, [navigate]);

  const handleLogout = () => {  
    localStorage.removeItem('token');
    setVal(true); 
    navigate('/')
  };

  return (
    <nav className="bg-blue-500 w-full p-4 shadow-md">
      <div className="flex justify-between items-center mx-auto">
        <Link to="/" className="text-lg font-bold text-black hover:text-gray-200">
          Home
        </Link>

        {val ? (
          <div className="flex space-x-9">
            <Link to="/login" className="font-semibold text-black hover:text-gray-200">
              Login
            </Link>
            <Link to="/signup" className="font-semibold text-black hover:text-gray-200">
              Signup
            </Link>
          </div>
        ) : (
          <div className='flex justify-center items-center space-x-4'>
            <Link to='/dashboard' className='cursor-pointer hover:text-white text-lg font-semibold'>Dashboard</Link>
            <p
              className="cursor-pointer hover:text-white text-lg font-semibold"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
