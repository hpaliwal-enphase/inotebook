import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from '../context/theme/ThemeContext';
import UserContext from '../context/user/UserContext';

const Navbar = () => {
    const themeContext = useContext(ThemeContext);
    const { theme, reverseTheme } = themeContext;

    const userContext = useContext(UserContext);
    const { loggedInUser } = userContext;

    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <div data-bs-theme={[theme]} >
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                        {
                            <div className='d-flex'>
                                <div className='d-flex align-items-center w-100 ms-1 me-4'>
                                    {theme === "dark" ? (
                                        <i className="fa-regular fa-lightbulb d-flex light" style={{fontSize:'1.5rem', color:'#ffffff'}} onClick={reverseTheme} />
                                    ) : (
                                        <i className="fa-regular fa-moon d-flex" style={{fontSize:'1.5rem'}} onClick={reverseTheme}/>
                                    )}
                                </div>
                            {
                            (!sessionStorage.getItem('token')) ? 
                            <>
                                <Link to="/login" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">Login</Link>
                                <Link to="/signup" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">Signup</Link>
                            </>
                              : (
                                <div className="d-flex justify-content-center">
                                    <div className="me-4 navbar-brand">Hi {loggedInUser.name}!</div>
                                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                                </div>
                            )
                            }
                            </div>
                        }
                        
                        
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
