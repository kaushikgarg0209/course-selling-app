import { Button, TextField, Card, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Signin() {
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState("")
    const navigate = useNavigate()
    async function handleClick () {
        const res = await axios.post("https://course-selling-app-jsxa.onrender.com/admin/login", {
            
        }, {
            headers: {
                "Content-type": "application/json",
                username: userName,
                password: password
            }
        });
        const data = res.data;
        console.log(data.token)
        if (data.token)
        {
            localStorage.setItem('token', data.token);
            window.location = '/addcourse'
        }
    }
    return (
        <div className="flex flex-col h-screen justify-center items-center ">
        <Typography variant="h6" className="text-center">
        Welcome Back
        <br></br>
        Signin Below
        <br></br>
        </Typography>
        
        <Card variant="outlined" className="m-4 p-5 w-96">
             <Input type = 'text' label="Username"  
               onChange={(e)=>setUserName(e.target.value)}/>
             <Input type='password' label="Password" id = "password" onChange={(e)=>setPassword(e.target.value)}></Input>
            <div className="flex justify-center mt-4"><Button variant="contained"  onClick={handleClick}>Sign In</Button></div>
        </Card>
        </div>
    )
}

function Input(proms) {
    return (
        <div className="m-4">
        <TextField id="outlined-basic" label={proms.label} variant="outlined" type={proms.type} className="w-full"
        value={proms.value} onChange={proms.onChange}
        ></TextField>
        </div>
    )
}

export default Signin