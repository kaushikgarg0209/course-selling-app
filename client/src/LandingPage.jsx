
import React from 'react';
import './LandingPage.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
   const navigate = useNavigate();
  return (
    <div className="landing-page pt-36">
      <header>
        <h1>Coursera</h1>
        <p>Unlock Your Potential with Our Courses</p>
      </header>
      <section className="features">
        <div className="feature">
          <h2>High-Quality Content</h2>
          <p>Access courses created by experts in the field.</p>
        </div>
        <div className="feature">
          <h2>Interactive Learning</h2>
          <p>Engage with hands-on projects and quizzes.</p>
        </div>
        <div className="feature">
          <h2>Flexible Schedule</h2>
          <p>Learn at your own pace, anytime, anywhere.</p>
        </div>
      </section>
      <section className="cta">
        <h2>Start Your Learning Journey Today!</h2>
        <p>Explore our courses and enhance your skills.</p>
        <button>Get Started</button>
      </section>
      <div className='pt-24 space-x-20'>
      <Button onClick={() => {navigate('/addcourse')}}>ADD YOUR COURSE</Button>
      <Button onClick={() => {navigate('/admincourses')}}>SEE YOUR COURSES</Button>
      </div>
    </div>
  );
};

export default LandingPage;
