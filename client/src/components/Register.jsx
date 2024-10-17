import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';


const Register = (props) =>{
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [role, setRole] = useState("user")
    const [errors, setErrors] = useState({})

    const submitHandler = (e) =>{
        e.preventDefault();

        const newUser ={
            userName,
            password,
            confirmPassword,
            role
        }
        axios.post('http://localhost:8000/api/register', newUser, {withCredentials:true})
        .then((res) =>{
            console.log(res);
            navigate("/home")
        })
        .catch((error) =>{
            setErrors(error.response.data.errors)
        })
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Register User</h1>
            <div className="card p-4">
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" type="text" onChange={(e) => setUserName(e.target.value)} />
                        {
                                errors.userName?
                                <p className="text-danger">{errors.userName.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                        {
                                errors.password?
                                <p className="text-danger">{errors.password.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input className="form-control" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        {
                                errors.password?
                                <p className="text-danger">{errors.password.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="role">Role: </label>
                        <select className="form-control" name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {
                                errors.role?
                                <p className="text-danger">{errors.role.message}</p> : null
                        }
                    </div>
                    <button className="btn btn-sm btn-warning">Register User</button>
                    <button onClick={() => navigate("/home")} className="btn btn-secondary ms-2">Go Back</button>
            </form>
            </div>
        </div>
        
    )
}

export default Register;