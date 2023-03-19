import React, { useContext, useEffect } from 'react';
// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
// import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
// import Alert from './Components/Alert';
import Signup from './Components/Signup';
import Login from './Components/Login';

import ThemeContext from './context/theme/ThemeContext';
import UserContext from './context/user/UserContext';

const MainRoutes = () => {
    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;

    const userContext = useContext(UserContext);
    const { setLoggedInUser } = userContext;

    const navigate = useNavigate();

    useEffect(()=>{
        if(!JSON.parse(sessionStorage.getItem('userDetails'))){
            navigate("/login");
        }
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        setLoggedInUser(userDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const navigate = useNavigate();

    // console.log(loggedInUser == null);

    document.getElementById('root').setAttribute('style', `background-color: ${theme=== "dark" ? "#343a40" : "white"}`);
    return (
        <div className='container py-3' data-bs-theme={theme}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    )
}

export default MainRoutes;
