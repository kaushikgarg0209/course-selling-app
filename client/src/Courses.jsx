import { Button, Card, Typography, containerClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Courses() {
    
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('https://course-selling-app-6l4t.onrender.com/admin/courses', {
            method: 'GET',
            headers: {
                "Content-type" : "application/json",
                "authorization" : "Bearer " + localStorage.getItem('token'),
            }
        }).then((respond) => respond.json()).then((data) => {
            console.log(data.courses)
            const filteredCourses = data.courses.filter((course) => {
                return course.adminId == localStorage.getItem('userId')
            })
            setCourses(filteredCourses);
        })
    }, [courses])


  return (
    <div className='pt-24 '>
        <Typography variant='h4' textAlign={'center'}>Courses</Typography>
        <br></br>
        <div className='flex flex-wrap justify-center'> 
        {
            courses.map((course) => {
                return <Course course = {course}/>
            })
        }
        </div>
    </div>
  )
}

function Course(proms)
{
    const navigate = useNavigate();
    return <div>
    <Card className=' w-96 min-h-80 m-14 p-3'>
    <Typography textAlign={'center'} variant='h6'>{proms.course.title}</Typography>
    <br/>
    <div className='flex justify-center'> <img className="items-center h-32" src={proms.course.imageLink}></img> </div>
    <div className='m-6'> <Typography textAlign={'center'}>{proms.course.description}</Typography> </div>
    <div className='flex justify-between pl-24 pr-24 pt-2 pb-5'>
    <Button variant='contained' onClick={() => {navigate(`/course/${proms.course._id}`)}}>Edit</Button>
    <Button variant='contained' onClick={() => {
        
        fetch(`https://course-selling-app-6l4t.onrender.com/admin/courses/${proms.course._id}`, {
            method : 'DELETE',
            headers: {
                "Content-type" : "application/json",
                "authorization" : "Bearer " + localStorage.getItem('token'),
            }
        }).then((res) => res.json()).then((data) => {
                if (data.message == 'course deleted successfully')
                {
                    alert('course deleted successfully')
                }
            })
    }}>Delete</Button>
    </div>

    <div className='flex justify-center m-5 border border-slate-950'>
    Rs. {proms.course.price}
    </div>
    </Card>
    <br></br>
    </div>
}

export default Courses