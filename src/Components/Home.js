import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from './Notes';
import ThemeContext from '../context/theme/ThemeContext';

const Home = () => {
    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;

    const navigate = useNavigate();

    useEffect(()=>{
        if(!sessionStorage.getItem('token')){
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div className="my-3 notes-section" data-bs-theme={theme}>
            <Notes />
        </div>
    )
}

export default Home;
