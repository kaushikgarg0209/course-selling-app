import { Button, Typography, Link } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Appbar(){

    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('https://course-selling-app-6l4t.onrender.com/admin/me', {
            headers : {
            "Content-type" : "application/json",
            "authorization" : "Bearer " + localStorage.getItem('token'),
            }
        }).then((res) => res.json()).then((data) => {
            localStorage.setItem('userId', data.userId)
            setUser(data.username)
        })
    }, [token])


    return(
        <div className="fixed bg-opacity-60 bg-[#eeeeee] w-full flex item-center justify-between">
        <div className="hover:cursor-pointer">
            <Typography className="pl-2" onClick={()=>{navigate('/')}}>Coursera</Typography>
            </div>
            <div>
            <Button variant="text"
            onClick={() => {
                if (!user) navigate('/signup')
            }} >{(user) ? `${user}` : 'Sign up'}</Button>
            
           
           {
            user?
           <Button variant="text" onClick={() => {
                navigate('/courses')
            }}> COURSES </Button>:
            <></>
           }
           

            <Button variant="text" onClick={() => {
                if (user)
                {
                    localStorage.setItem('token', null)
                    localStorage.setItem('userId', null)
                    navigate('/')
                    setUser(null);
                }
                else navigate('/signin')
            }}>{(user) ? `Logout` : 'Sign in'}</Button>
           
            </div> 
        </div>
    )
}



export default Appbar