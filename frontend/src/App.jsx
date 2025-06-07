import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Account from './pages/Account'
import './App.css'
import Navbar  from './components/Navbar'
import Footer from './components/Footer'
import CreateNote from './pages/CreateNote'
import Notestate from './context/NotesContexts/NoteSates'
import Userstate from './context/UserContext/UserSates'
import ProtectedRoute from './Routes/protectedRoute'
function App() {
  

  return (
    <>
    <Userstate>
    <Notestate>
   <Navbar />

      <Routes>
        <Route path='/' element={<ProtectedRoute Component={Home}/>}/>
        <Route  path='/about'element={<About/>}/>
        <Route  path='/Notes'element={<ProtectedRoute Component={CreateNote}/>}/>
        <Route  path='/Account'element={<ProtectedRoute Component={Account}/>}/>
        
      </Routes>
    
   <Footer/>
   </Notestate>
    </Userstate>
    </>
  )
}

export default App
