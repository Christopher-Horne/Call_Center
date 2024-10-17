import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Nav = ({ darkMode, toggleDarkMode, user, setUser }) =>{

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)

    // const [user, setNewUser] = useState({})
    // const [customer, setNewCustomer] = useState({})

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/customers/customer/${id}`)
    //     .then((response) => {
    //         setNewUser(response.data)
    //     })
    //     .catch((error) => {
    //     })
    // }, [id])


    const getHeader = () =>{
        if (location.pathname == "/") {
            return "Please Login"
        }
        if (location.pathname == "/home"){
            return "Available Pharmacies"
        }
        if (location.state == "details"){
            console.log("HERE:", location.pathname.slice(location.pathname.lastIndexOf("/") +1, location.pathname.length))
            const customerName = location.pathname.slice(location.pathname.lastIndexOf("/") +1, location.pathname.length)
            const newCustomerName = customerName.replaceAll("%20", " ")
            return `${newCustomerName} Details`
        }
        if (location.state == "edit") {
            console.log("HERE:", location.pathname.slice(location.pathname.lastIndexOf("/") +1, location.pathname.length))
            const customerName = location.pathname.slice(location.pathname.lastIndexOf("/") +1, location.pathname.length)
            const newCustomerName = customerName.replaceAll("%20", " ")
            return `Update ${newCustomerName}`;
        }
    }

    const Logout = () =>{
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
        .then(() =>{
            setUser(null)
            navigate('/')
        })
        .catch((err =>{
            console.log(err);
        }))
    }

    return (
        <header>
            <nav className={`navbar fixed-top ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
                <div>
                    <Link to={"/home"}><button className="btn btn-m btn-warning me-2">Home</button></Link>
                    <Link to={"/newCustomer"}><button className="btn btn-m btn-warning me-2" >Create Customer</button></Link>
                    {user && user.role === 'admin' && ( // Is the user is logged in and the role is admin then show the button
                        <Link to={"/registerUser"}><button className="btn btn-m btn-warning">New User</button></Link>
                    )}
                </div>
                <h1>{getHeader()}</h1>
                <div className="d-flex align-items-center">
                    <button onClick={toggleDarkMode} className="btn btn-secondary me-2">
                        Toggle Dark Mode
                    </button>
                    <Link to={"/"}><button className="btn btn-m btn-warning" onClick={Logout}>Logout</button></Link>
                {/* <div className="form-inline">
                {
                    location.pathname === "/home" && (<Link to="/"><button type="button" className="btn btn-sm btn-warning">Log Out</button></Link>)
                }
                {
                    location.pathname === `/customer/${customer._id}/edit/${customer.customerName}` && (<Link to={`/customer/${customer._id}/edit/${customer.customerName}`}><button type="button" className="btn btn-sm btn-warning">Details</button></Link>)
                }
                {
                    location.pathname === `/customer/${customer._id}/details/${customer.customerName}` && (<Link to={`/customer/${customer._id}/edit/${customer.name}`}><button type="button" className="btn btn-sm btn-warning">Update</button></Link>)
                }
                </div> */}
                </div>
            </nav>
        </header>
    )
}

export default Nav;