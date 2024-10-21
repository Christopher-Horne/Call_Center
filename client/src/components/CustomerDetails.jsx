import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerDetails = ({user}) =>{
    const {id} = useParams()
    const navigate = useNavigate()
    //const {user} = props;
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/customers/customer/${id}`)
        .then((response) => {
            setCustomer(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [id])

    const deleteCustomer = (id) => {
        axios.delete(`http://localhost:8000/api/customers/delete/customer/${id}`)
        .then(() => navigate("/home"))
        .catch((err) => console.log(err))
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h3>Customer Details</h3>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{customer.customerName}</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Street Address: {customer.streetAddress}</li>
                        <li className="list-group-item">City: {customer.city}</li>
                        <li className="list-group-item">State: {customer.state}</li>
                        <li className="list-group-item">Zip/Country Code: {customer.zipCode}</li>
                        <li className="list-group-item">Country: {customer.country}</li>
                        <li className="list-group-item">Phone: <a href={`tel:${customer.phoneNumber}`}>{customer.phoneNumber}</a></li>
                        <li className="list-group-item">Email: <a href={`mailto:${customer.email}`}>{customer.email}</a></li>
                    </ul>
                    <div className="card-footer text-end">
                        {user && user.role === 'admin' && ( // Is the user is logged in and the role is admin then show the button
                            <button onClick={() => deleteCustomer(customer._id)} className="btn btn-sm btn-danger">Delete Customer</button>
                        )}
                        <button onClick={() => navigate("/home")} className="btn btn-secondary ms-2">
                        Go Back
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CustomerDetails;