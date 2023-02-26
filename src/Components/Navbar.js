import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from '../context/theme/ThemeContext';

const Navbar = () => {
    const themeContext = useContext(ThemeContext);
    const { theme, reverseTheme } = themeContext;
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
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
                                <button type="button" className="btn btn-primary mx-1" onClick={reverseTheme}>Switch Theme</button>
                            {
                            (!localStorage.getItem('token')) ? 
                            <>
                                <Link to="/login" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">Login</Link>
                                <Link to="/signup" className="btn btn-primary mx-1" tabIndex="-1" role="button" aria-disabled="true">Signup</Link>
                            </>
                              : (
                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
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
