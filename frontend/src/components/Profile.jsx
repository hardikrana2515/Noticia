import React, { use, useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import { useContext } from 'react';
import userContext from '../context/UserContext/userContext.js'
import Loader from './Loader';

const Profile = () => {
  const { GetUser,user,setUser } = useContext(userContext);
 

  useEffect(() => {
    const fetchUser = async () => {
      await GetUser();
    };
    fetchUser();
  }, [])


  if (!user) {
    
    return <Loader />;
  }

  return (
     <section className="bg-gradient-to-r from-blue-300 to-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-200 p-8 sm:p-10 md:flex md:space-x-10 transition-all duration-300">
        
        {/* Profile Picture & Upload */}
        <div className="flex flex-col items-center space-y-4 md:w-1/3">
          <img
            src={user.image ? `http://localhost:5000${user.image}` : "/default-user.png"}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-blue-300 shadow-lg object-cover transition-transform hover:scale-105"
          />
          <ImageUpload />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-5 mt-8 md:mt-0 text-blue-900">
          <h2 className="text-3xl font-extrabold text-blue-800 border-b border-blue-200 pb-2 mb-4">
            {user.name}
          </h2>

          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex items-center">
              <span className="w-28 font-semibold text-blue-700">Username:</span>
              <span className="text-gray-700">{user.username}</span>
            </div>

            <div className="flex items-center">
              <span className="w-28 font-semibold text-blue-700">Email:</span>
              <span className="text-gray-700">{user.email}</span>
            </div>

            <div className="flex items-center">
              <span className="w-28 font-semibold text-blue-700">Phone:</span>
              <span className="text-gray-700">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile