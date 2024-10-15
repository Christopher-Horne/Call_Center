import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Home = () =>{
    const [customers, setCustomers] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/customers/allCustomers")
            .then((response) =>{
                setCustomers(response.data);
            })
            .catch((err) =>{
                console.log(err)
            })
    }, [])

    return (
        <div>
            {/* <h1>Patients</h1> */}

            <table className ="border border-2 table table-striped p-2">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip/Country Code</th>
                        <th>Country</th> 
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((customer) =>(
                            <tr key={customer._id}>
                                <td><Link to={`/customer/${customer._id}/details/${customer.customerName}`} state={'details'}>{customer.customerName}</Link></td>
                                <td>{customer.streetAddress}</td>
                                <td>{customer.city}</td>
                                <td>{customer.state}</td>
                                <td>{customer.zipCode}</td>
                                <td>{customer.country}</td>
                                <td>{customer.email}</td>
                                <td><Link to={`/customer/${customer._id}/edit/${customer.customerName}`} state={'edit'}><button type="button" className="btn btn-sm btn-warning" >Edit</button></Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home;