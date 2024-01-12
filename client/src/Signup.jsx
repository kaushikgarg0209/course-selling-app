import { Button, TextField, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
function Signup() {
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState("")
    const navigate = useNavigate()
    async function handleClick () {
        const res = await axios.post('https://course-selling-app-jsxa.onrender.com/admin/signup', {
            username : userName,
            password : password
        })
        let data = res.data;
        localStorage.setItem('token', data.token);
        if (data.token){
            window.location = '/addcoursecd'
        }
    }
    return (
        <div className="flex flex-col h-screen justify-center items-center ">
        <Typography variant="h6" className="text-center">
        Welcome to Coursera
        <br></br>
        Signup Below
        <br></br>
        </Typography>
        
        <Card variant="outlined" className="m-4 p-5 w-96">
             <Input type = 'text' label="Username"  
               onChange={(e)=>setUserName(e.target.value)}/>
             <Input type='password' label="Password" id = "password" onChange={(e)=>setPassword(e.target.value)}></Input>
            <div className="flex justify-center mt-4"><Button variant="contained"  onClick={handleClick}>Sign Up</Button></div>
        </Card>
        </div>
    )
}

function Input(proms) {
    return (
        <div className="m-4">
        <TextField id="outlined-basic" label={proms.label} variant="outlined" type={proms.type} className="w-full"
        onChange={proms.onChange}
        ></TextField>
        </div>
    )
}

export default Signup