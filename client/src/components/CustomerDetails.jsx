import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerDetails = (props) =>{
    const {id} = useParams()
    const navigate = useNavigate()

    const [customer, setCustomer] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/customers/customer/${id}`)
        .then((response) => {
            setCustomer(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const deleteCustomer = (id) => {
        axios.delete(`http://localhost:8000/api/customers/delete/customer/${id}`)
        .then(() => navigate("/home"))
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <h2>Customer Name: {customer.customerName}</h2>
            <p>Street Address: {customer.streetAddress}</p>
            <p>City: {customer.city}</p>
            <p>State: {customer.state}</p>
            <p>Zip/Country Code: {customer.zipCode}</p>
            <p>Country: {customer.country}</p>
            <p>Email: {customer.email}</p>
            <button onClick={() => deleteCustomer(customer._id)} className="btn btn-sm btn-danger">Delete Customer</button>
        </div>
    )
}

export default CustomerDetails;