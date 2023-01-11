import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alerts/AlertContext';



const Login = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const host = "http://localhost:5000";
    let navigate = useNavigate();

    const alertContext = useContext(AlertContext);
    const {showAlert} = alertContext;

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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleTextChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name="password" onChange={handleTextChange} id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
