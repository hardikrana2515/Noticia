import React from 'react'
import { useContext } from 'react'
import userContext from '../context/UserContext/userContext.js'
import Notes from '../components/Notes.jsx'
import Hr from '../components/Hr.jsx'
import TitelHome from '../components/TitelHome.jsx'
import Feature_list from '../components/Feature_list.jsx'
import Auth from '../components/Auth.jsx'
import { set } from 'date-fns'

 const Home = () => {
   
   const {auth,setAuth} = useContext(userContext)
  
    
  return (
     <div>
      {auth ? (
        <>
          <Feature_list />
          <Hr />
          <TitelHome />
          <Notes />
        </>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default Home