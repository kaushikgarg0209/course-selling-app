import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Signup from './Signup'
import Appbar from './Appbar'
import Signin from './Signin'
import AddCourse from './AddCourse'
import Courses from './Courses'
import Course from './Course'
import LandingPage from './LandingPage'

function App() {
  
  return (
    <div className='min-h-screen bg-[#eeeeee]'>
    <Router>
    <Appbar/>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path="/addcourse" element={<AddCourse />}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:courseId" element={<Course />} />
            </Routes>
      </Router>
    </div>
  )
}

export default App
