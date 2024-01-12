import {Button, Card, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [price, setPrice] = useState('');

  function handleClick () {
    fetch('http://localhost:3000/admin/courses', {
      method : "POST",
      body : JSON.stringify({
        title: title,
        description: description,
        price : price,
        imageLink: imageLink,
        published: true,
        adminId: localStorage.getItem('userId')
      }),
      headers: {
        "Content-type" : "application/json",
        "authorization" : "Bearer " + localStorage.getItem('token'),
      }
    }).then((respond) => respond.json()).then((data) => {
      console.log((data));
      alert('course added')
      setTitle('');
      setDescription('');
      setImageLink('');
      setPrice('');
    })
  }

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
   
      <Typography variant='h6'>Add Course</Typography>

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
            <Button variant="contained" onClick={handleClick}>Add Course</Button></div>
        </Card>
    </div>
  )
}

export default AddCourse