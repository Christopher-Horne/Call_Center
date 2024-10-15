import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import CustomerEdit from './components/CustomerEdit.jsx'
import './App.css'
//import Nav from './components/Nav'
// import CustomerDetails from './components/CustomerDetails.jsx'
// import CustomerEdit from './components/CustomerEdit.jsx'
//import CreatePatient from './views/Home.jsx'




function App() {

  return (
    <div>
      <BrowserRouter>
      {/* <Nav />     // This makes sure the Nav component renders on all routes. */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/customer/:id/details/:name" element={<CustomerDetails />} />
          <Route path="/customer/:id/edit/:name" element={<CustomerEdit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App