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
            // console.log(data.courses)
            setCourses(data.courses);
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
    const [user, setUser] = useState(null); 
    // console.log(proms.course.adminId)
    useEffect(() => {
        fetch('https://course-selling-app-6l4t.onrender.com/admin/adminName',{
            method : 'GET',
            headers : {
                "adminId": proms.course.adminId,
                "Content-type" : "application/json",
                "authorization" : "Bearer " + localStorage.getItem('token'),
            }
        }).then((res) => res.json()).then((data) => {
            // console.log(data)
            // console.log(proms.course.adminId)
            setUser(data.username)
        })
    }, [])
    const navigate = useNavigate();
    
    return <div>
    <Card className=' w-96 min-h-80 m-14 p-3'>
    <Typography textAlign={'center'} variant='h6'>{proms.course.title}</Typography>
    <br/>
    <div className='flex justify-center'> <img className="items-center h-32" src={proms.course.imageLink}></img> </div>
    <div className='m-6'> <Typography textAlign={'center'}>{proms.course.description}</Typography> </div>
    <div className='flex justify-between pl-24 pr-24 pt-2 pb-5'>
    
    </div>

    <div className='flex justify-center m-5 border border-slate-950'>
    Rs. {proms.course.price}
    </div>
    <div className='text-right'>
        -by {user}
    </div>
    </Card>
    <br></br>
    </div>
}

export default Courses