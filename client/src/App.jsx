import { useState, useEffect  } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import CustomerDetails from './components/CustomerDetails.jsx'
import CustomerEdit from './components/CustomerEdit.jsx'
import NewCustomer from './components/CreateCustomer.jsx'
import RegisterUser from './components/Register.jsx'
import './App.css'
import Nav from './views/Nav.jsx'



function App() {

  // Toggle Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // Update body class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
    } 
    else {
      document.body.classList.remove('bg-dark', 'text-white');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (

    <div className={darkMode ? 'bg-dark text-white' : ''}>
      <BrowserRouter>
        {/* <Nav />     // This makes sure the Nav component renders on all routes. */}
        <button onClick={toggleDarkMode} className="btn btn-secondary m-3">
          Toggle Dark Mode
        </button>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<><Nav /><Home /></>} />
          <Route path="/customer/:id/details/:name" element={<><Nav /><CustomerDetails /></>} />
          <Route path="/customer/:id/edit/:name" element={<><Nav /><CustomerEdit/></>} />
          <Route path="/newCustomer" element={<><Nav /><NewCustomer/></>} />
          <Route path="/registerUser" element={<><Nav /><RegisterUser/></>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App