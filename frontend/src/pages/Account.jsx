import React from 'react'
import Logout from '../components/Logout'
import Profile from '../components/Profile'


 const Account = () => {
  return (
    <div className='flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-white p-6'>
       <h1 className='text-4xl font-bold text-blue-800 mb-6'>My Account</h1>
      <Profile/>
       <Logout/>
    </div>
  )
}

export default Account