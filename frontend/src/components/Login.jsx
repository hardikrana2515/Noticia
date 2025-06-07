import React,{ useState} from 'react'
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import userContext from '../context/UserContext/userContext.js'



const Login = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const {login,loginMode,setLoginMode,auth,setAuth} = useContext(userContext);

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials.email, credentials.password);
    setCredentials({email: '', password: ''});
    navigate('/')
    
  }


  return (
     <div className='flex flex-col justify-center items-center z-50'>
      <div className="fixed inset-0 border border-blue-300 rounded-3xl bg-transparent bg-opacity-30 backdrop-blur-xs flex flex-col items-center justify-center z-50">
        <img src="/user.png" alt="User" className='p-2 m-3 rounded-full h-30 w-auto' />
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-300 relative"
        >
          <div className="mb-6">
            <label htmlFor="email" className="block text-blue-800 font-semibold mb-2 tracking-wide">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
              required

            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-blue-800 font-semibold mb-2 tracking-wide">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg tracking-wider"
          >
            Log In
          </button>
           <div className="mt-4 text-center">
            <p className="text-blue-800">
              Don't have an account?
            </p>
        <span
          className="cursor-pointer hover:underline text-blue-600 font-semibold"  onClick={() => setLoginMode(false)}>
          Sign Up
        </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login