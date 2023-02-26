import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alerts/AlertContext';
import ThemeContext from '../context/theme/ThemeContext';

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", confirmPassword: ""});
    const host = "http://localhost:5000";
    let navigate = useNavigate();

    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;

    const themeContext = useContext(ThemeContext);
    const { theme } = themeContext;

    const handleTextChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const response = fetch(`${host}/api/auth/createuser`, {
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
                showAlert("Account Created Successfully", "success");
                navigate("/");
            }
            else{
                showAlert(data.error, "danger");
            }
        })

        //redirect
    }

    return (
        <div data-bs-theme={theme} style={{height: '100vh'}}>
            <form onSubmit={handleSubmit} style={theme === "dark" ? {color: "#ffffff"} : {color: "#212529"}}>
                <h2 className="mb-4">Sign up to use iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" style={{color:'#000000'}} value={credentials.name} onChange={handleTextChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" style={{color:'#000000'}} value={credentials.email} onChange={handleTextChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"  name="password" style={{color:'#000000'}} value={credentials.password} onChange={handleTextChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="password"  name="confirmPassword" style={{color:'#000000'}} value={credentials.confirmPassword} onChange={handleTextChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;
