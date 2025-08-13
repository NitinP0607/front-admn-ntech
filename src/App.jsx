import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import VerifyEmail from './Pages/verifyEmail'
import Navbar from './Pages/Navbar'
import EditJobs from './Pages/EditJobs'
import JobPost from './Pages/JobPost'
import JobList from './Pages/JobList'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes> 
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path='/jobs-post' element={<JobPost />} />
      <Route path='edit-jobs/:id' element={<EditJobs />} />
      <Route path="/all-jobs" element={<JobList />} />
    </Routes>
    
    </>
  )
}

export default App
