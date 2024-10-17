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

  const [user, setUser] = useState(null);

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

    <div className={darkMode ? 'bg-dark text-white' : 'bg-light'}>
      <BrowserRouter>
        {/* <Nav />     // This makes sure the Nav component renders on all routes. */}
        {user && (
        <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} setUser={setUser} />
        )}
        {/* <button onClick={toggleDarkMode} className="btn btn-secondary m-3">
          Toggle Dark Mode
        </button> */}
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/customer/:id/details/:name" element={<CustomerDetails />} />
          <Route path="/customer/:id/edit/:name" element={<CustomerEdit/>} />
          <Route path="/newCustomer" element={<NewCustomer/>} />
          <Route path="/registerUser" element={<RegisterUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App