import React from 'react'
import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Typography, TextField, Button, Box, LinearProgress } from '@mui/material';

function Course() {
let {courseId} = useParams();
const [course, setCourse] = useState([]);
useEffect(() => {
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
        method: 'GET',
        headers: {
            "Content-type" : "application/json",
            "authorization" : "Bearer " + localStorage.getItem('token')
        }
    }).then((respond) => respond.json()).then((data) => {
        setCourse(data.course);
        // console.log(course)
    })
}, [course])

    if (!course) return (<div className='p-24'>Course don't exists</div>)

  return (
    
    <div className='flex flex-wrap justify-evenly pt-24'>
        <Card className='p-3 w-96 min-h-80 m-4'>
    <Typography textAlign={'center'} variant='h6'>{course.title}</Typography>
    <br/>
    <div className='flex justify-center'> <img className="items-center h-32" src={course.imageLink}></img> </div>
    <div className='m-6'> <Typography textAlign={'center'}>{course.description}</Typography> </div>

    <div className='flex justify-between pl-24 pr-24 pt-2 pb-5'>
    <Button variant='contained'>Edit</Button>
    <Button variant='contained'>Delete</Button>
    </div>

    <div className='flex justify-center m-5 border border-slate-950'>
        Rs. {course.price}
    </div>
    </Card>

    <UpdateCard courseId = {courseId} setCourse = {setCourse}></UpdateCard>
    </div>
  )
}

function UpdateCard(proms) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [price, setPrice] = useState('');

    
    async function handleClick () {
        
        await fetch(`http://localhost:3000/admin/courses/${proms.courseId}`, {
        method : "PUT",
        body : JSON.stringify({
            title: title,
            description: description,
            price : price,
            imageLink: imageLink,
            published: true
        }),
        headers: {
            "Content-type" : "application/json",
            "authorization" : "Bearer " + localStorage.getItem('token'),
        }
        }).then((respond) => respond.json()).then((data) => {
        console.log((data));
        if (data.message == 'Course updated successfully')
        {
            proms.setCourse(data.course)
            setTitle('')
            setDescription('')
            setImageLink('' )
            setPrice('')
        }
        })
    }

    return (
        <div >
    
        <Typography textAlign={'center'} variant='h6'>Update Course</Typography>

        <Card variant="outlined" className="m-4 p-5 w-96">
        <div className='m-2 flex justify-center'>
                <TextField className='w-96' type = 'text' label="Title"  value={title}
                onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='m-2 flex justify-center'>
                <TextField className='w-96' type='text' label="Description" value={description}
                onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className='m-2 flex justify-center'>
                <TextField className='w-96' type='text' label="Image Link" value={imageLink}
                onChange={(e)=>setImageLink(e.target.value)}/>
            </div>
            <div className='m-2 flex justify-center'>
                <TextField className='w-96' type='text' label="Price" value={price}
                onChange={(e)=>setPrice(e.target.value)}/>
            </div>
                <div className="flex justify-center mt-4">
                <Button variant="contained" onClick={handleClick}>Update Course</Button></div>

                
            </Card>
        </div>
    )
}


export default Course