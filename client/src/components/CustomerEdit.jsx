import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerEdit = (props) =>{
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


    const getCustomer = ()  =>{
        axios.get(`http://localhost:8000/api/customers/customer/${id}`)
        .then((response) => {
            setCustomerName(response.data.customerName);
            setStreetAddress(response.data.streetAddress);
            setCity(response.data.city);
            setState(response.data.state);
            setZipCode(response.data.zipCode);
            setCountry(response.data.country);
            setEmail(response.data.email);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getCustomer()
    }, [])



    const submitHandler = (e) =>{
        e.preventDefault();
        const updatedCustomer ={
            customerName,
            streetAddress,
            city,
            state,
            zipCode,
            country,
            email
        }

        axios.put(`http://localhost:8000/api/customers/updateCustomer/${id}`, updatedCustomer)
            .then((response) =>{
                navigate(`/customer/${id}/details/${customerName}`)
            })
            .catch((error) =>{
                setErrors(error.response.data.errors)
                getCustomer()
            })
    }
    return (
        <div className="container mt-4">
            <div className="card p-4">
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label className="form-label">Customer Name: </label>
                        <input className="form-control" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        {
                            errors.customerName?
                            <p className="text-danger">{errors.customerName.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Street Address: </label>
                        <input className="form-control" type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                        {
                            errors.streetAddress?
                            <p className="text-danger">{errors.streetAddress.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">City: </label>
                        <input className="form-control" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        {
                            errors.city?
                            <p className="text-danger">{errors.city.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">State: </label>
                        <input className="form-control" type="text" value={state} onChange={(e) => setState(e.target.value)} />
                        {
                            errors.state?
                            <p className="text-danger">{errors.state.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Zip/Country Code: </label>
                        <input className="form-control" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                        {
                            errors.zipCode?
                            <p className="text-danger">{errors.zipCode.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Country: </label>
                        <input className="form-control" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                        {
                            errors.country?
                            <p className="text-danger">{errors.country.message}</p> : null
                        }
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email: </label>
                        <input className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {
                            errors.email?
                            <p className="text-danger">{errors.email.message}</p> : null
                        }
                    </div>
                    <button className="btn btn-sm btn-warning">Update Customer</button>
                    <button onClick={() => navigate("/home")} className="btn btn-secondary ms-2">
                        Go Back
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CustomerEdit;