import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alerts/AlertContext';
import ThemeContext from '../context/theme/ThemeContext';


const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const host = "http://localhost:5000";
    let navigate = useNavigate();

    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;

    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })

        response.then((responseData) => {
            return responseData.json();
        }).then((data) => {
            console.log(data);
            if(data.success){
                //redirect
                localStorage.setItem('token', data.token);
                showAlert("Logged in Successfully", "success");
                navigate("/");
            }
            else{
                showAlert(data.error, "danger");
            }
        })
    }

    const handleTextChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }


    return (
        <div data-bs-theme={theme} style={{height: '100vh'}}>
            <form onSubmit={handleSubmit} data-bs-theme={theme} style={theme === "dark" ? {color: "#ffffff"} : {color: "#212529"}}>
                    
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="email" name="email"  value={credentials.email} onChange={handleTextChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control${theme === "dark" ? ' bg-dark' : ''}`} id="password" name="password"  value={credentials.password} onChange={handleTextChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
