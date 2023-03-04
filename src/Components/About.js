import React, { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

const About = () => {
    const context = useContext(ThemeContext);
    const { theme } = context;
    return (
        <div data-bs-theme={theme} style={{height: '100vh'}}>
            <h3>This is a secure cloud-based Notes manager application.</h3>
        </div>
    )
}

export default About;
