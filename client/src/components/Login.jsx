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
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card">
                <form onSubmit={submitHandler}>
                    <h5 className="card-title text-center">Login</h5>
                    <div className="mb-3">
                        <label className="form-label">User Name: </label>
                        <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password: </label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-warning w-100">Login</button>
                </form>
            </div>
        </div>
        
)}

export default Login;