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
        <form onSubmit={submitHandler}>
            <h1>Register User</h1>
            <div>
                <label>Username</label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} />
                {
                        errors.userName?
                        <p className="text-danger">{errors.userName.message}</p> : null
                }
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                {
                        errors.password?
                        <p className="text-danger">{errors.password.message}</p> : null
                }
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                {
                        errors.password?
                        <p className="text-danger">{errors.password.message}</p> : null
                }
            </div>
            <div>
                <label htmlFor="role">Role: </label>
                <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {
                        errors.role?
                        <p className="text-danger">{errors.role.message}</p> : null
                }
            </div>
            <button>Register User</button>
        </form>
    )
}

export default Register;