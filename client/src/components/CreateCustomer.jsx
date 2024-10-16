import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'


const CreateCustomer = (props) =>{
    const navigate = useNavigate()
    const {id} = useParams()
    const [customerName, setCustomerName] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [country, setCountry] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({})

    const submitHandler = (e) =>{
        e.preventDefault();

        const newCustomer ={
            customerName,
            streetAddress,
            city,
            state,
            zipCode,
            country,
            email
        }
        axios.post("http://localhost:8000/api/customers/newCustomer", newCustomer)
            .then((res) =>{
                console.log(res)
                navigate("/home")
            })
            .catch((error) =>{
                setErrors(error.response.data.errors)
            })
    }

    return (
        <div>
            <h1>Create Customer</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="p-2">Customer Name: </label>
                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    {
                        errors.customerName?
                        <p className="text-danger">{errors.customerName.message}</p> : null
                    }
                </div>
                <div className="mb-3">
                    <label className="p-2">Street Address: </label>
                    <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                    {
                        errors.streetAddress?
                        <p className="text-danger">{errors.streetAddress.message}</p> : null
                    }
                </div>
                <div className="mb-3">
                    <label className="p-2">City: </label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    {
                        errors.city?
                        <p className="text-danger">{errors.city.message}</p> : null
                    }
                </div>
                <div className="mb-3">
                    <label className="p-2">State: </label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    {
                        errors.state?
                        <p className="text-danger">{errors.state.message}</p> : null
                    }
                </div>
                <div className="mb-3">
                    <label className="p-2">Zip/Country Code: </label>
                    <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    {
                        errors.zipCode?
                        <p className="text-danger">{errors.zipCode.message}</p> : null
                    }
                </div>
                <div className="mb-3">
                    <label className="p-2">Country: </label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                    {
                        errors.country?
                        <p className="text-danger">{errors.country.message}</p> : null
                    }
                </div>
                <div className="mb-3">
                    <label className="p-2">Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {/* {
                        errors.email?
                        <p className="text-danger">{errors.email.message}</p> : null
                    } */}
                </div>
                <button className="btn btn-sm btn-warning">Submit</button>
            </form>
        </div>
    )
}

export default CreateCustomer;