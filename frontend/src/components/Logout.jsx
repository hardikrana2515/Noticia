import React from 'react'
import { useContext } from 'react';
import UserContext from '../context/UserContext/userContext.js';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();
    const {logout,auth,setAuth} = useContext(UserContext);
  return (
    <div>
        <button className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300'
            onClick={() => {
                logout();
                navigate('/');
                
            }}>
            Log Out
            </button>
    </div>
  )
}

export default Logout