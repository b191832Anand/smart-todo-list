import {React,useState} from 'react'
import { Link,Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'
const signup = () => {
  const navigate=useNavigate()
  const [username,setusername]=useState('');
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const handlesubmit=async(e)=>{
    e.preventDefault();
    
      try{
          const a=await axios.post('http://localhost:5000/api/signup',{username, email, password});
          toast.success("signup successful")
          navigate('/login')
      }
      catch(e){
        console.log(e.response.data);
         toast.error(e.response.data)
      }
  }
  return (
    <div className='flex justify-center items-center bg-gray-200 min-h-screen'>
        <div className='p-8 m-2 sm:w-96 w-full bg-white border-black rounded-lg shadow-lg'>
           <p className="text-center text-lg font-semibold">Signup</p>
           <form action="" className='space-y-4' onSubmit={handlesubmit}>
             <div>
               <label htmlFor="username" className='text-lg block font-semibold'>Username</label>
               <input t
               ype="text" 
               id='username'
               value={username}
               className='mt-1 px-1 py-1 w-full border border-gray-300 rounded-lg'
               placeholder='enter your name'
               onChange={(e)=>setusername(e.target.value)}
               required
               />
             </div>
             <div>
               <label htmlFor="email" className='text-lg block font-semibold'>Email</label>
               <input t
               ype="text" 
               id='email'
               value={email}
               className='mt-1 px-1 py-1 w-full border border-gray-300 rounded-lg'
               placeholder='enter your email'
               onChange={(e)=>setemail(e.target.value)}
               required
               />
             </div>
             <div>
               <label htmlFor="password" className='text-lg block font-semibold'>Password</label>
               <input t
               ype="text" 
               id='password'
               value={password}
               className='mt-1 px-1 py-1 w-full border border-gray-300 rounded-lg'
               placeholder='enter your password'
               onChange={(e)=>setpassword(e.target.value)}
               required
               />
             </div>
             <div>
               <div className='flex items-center space-x-1'>
               <p>Already Have an Account?</p>
               <Link to='/login' className='text-blue-600 hover:underline'>Login</Link>
               </div>
               <button type='submit'className=' mt-2 w-full px-2 py-2 bg-blue-400 rounded-lg'> Signup</button>
             </div>
           </form>
        </div>
    </div>
  )
}

export default signup
