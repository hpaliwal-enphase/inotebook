import React, { useState, useContext } from 'react';
import ThemeContext from './ThemeContext';

const ThemeState = (props) => {
    const [theme, setTheme] = useState("light");

    const reverseTheme = () => {
        switch (theme) {
            case "light":
                setTheme("dark");
                break;
            case "dark":
                setTheme("light");
                break;
            default:
                break;
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, reverseTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeState;