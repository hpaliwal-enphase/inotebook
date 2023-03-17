import React, { useContext } from 'react';

import Notes from './Notes';
import ThemeContext from '../context/theme/ThemeContext';

const Home = () => {
    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;
    return (
        <div className="my-3 notes-section" data-bs-theme={theme}>
            <Notes />
        </div>
    )
}

export default Home;
