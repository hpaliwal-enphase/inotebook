import React, { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

const About = () => {
    const context = useContext(ThemeContext);
    const { theme } = context;
    return (
        <div>
            This is About.
        </div>
    )
}

export default About;
