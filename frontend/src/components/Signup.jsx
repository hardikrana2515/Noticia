import React,{useState} from 'react'
import { useContext } from 'react';
import userContext from '../context/UserContext/userContext.js'


const SignUp = () => {
 
  const {signup,loginMode,setLoginMode} = useContext(userContext);
  const [credentials,setCredentials ] = useState({
    email: '',
    phone: '',
    name: '',
    username: '',
    password: '',
    cpassword: ''
  });
  const [error, setError] = useState('');

  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      if (credentials.password !== credentials.cpassword) {
      setError("Passwords do not match");
      return;
    }

      signup(
        credentials.email,
        credentials.phone,
        credentials.name,
        credentials.username,
        credentials.password
      );
     
      setCredentials({
        email: '',
        phone: '',
        name: '',
        username: '',
        password: '',
        cpassword: ''
      });
      
      setError('');

  }
     

  return (
    
     <div className='flex flex-col justify-center items-center '>
      <div className="fixed inset-0 border border-blue-300 rounded-3xl bg-transparent bg-opacity-30 backdrop-blur-xs flex flex-col items-center justify-center z-50 ">
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
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            />
          </div>
        <div className="mb-6">
            <label htmlFor="phone" className="block text-blue-800 font-semibold mb-2 tracking-wide">
              Phone-nummber
            </label>
            <input
              type="text"
              placeholder="Enter your Phone-nummber"
              id="phone"
              value={credentials.phone}
              minLength={10}
              maxLength={10}
              pattern='[0-9]{10}'
              title='Please enter a valid 10-digit phone number'
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            />
          </div>
        <div className="mb-6 flex flex-row items-center gap-4">
          <div className="mb-6">
            <label htmlFor="name" className="block text-blue-800 font-semibold mb-2 tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              id="name"
              value={credentials.name}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            />
            </div>

            <div className="mb-6">
            <label htmlFor="username" className="block text-blue-800 font-semibold mb-2 tracking-wide">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            />
            </div>
          </div>
         <div className="mb-6 flex flex-row items-center gap-4">
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
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cpassword" className="block text-blue-800 font-semibold mb-2 tracking-wide">
             Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              id="cpassword"
              value={credentials.cpassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-blue-50 placeholder:text-sm"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
          )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg tracking-wider"
          >
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <p className="text-blue-800">
              Already have an account?
            </p>
        <span
          className="cursor-pointer hover:underline text-blue-600 font-semibold"  onClick={() => setLoginMode(true)}>
          Log In
        </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp