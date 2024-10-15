import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = (props) =>{
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {userName, password}, {withCredentials:true})
            .then((res) =>{
                console.log(res);
                navigate('/home')
            })
            .catch((err =>{
                console.log(err);
            }))
    }


    return (
        <form onSubmit={submitHandler}>
            <h1>Login</h1>
            <div>
                <label>User Name: </label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button>Login</button>
        </form>
)}

export default Login;