import React, { useContext } from 'react'
import AlertContext from '../context/alerts/AlertContext'

const Alert = (props) => {
    const alertContext = useContext(AlertContext);
    const {alert} = alertContext;
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: '10px' }}>
            {
                (alert) ?
                    (<div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
                        <strong>{capitalize(alert.type)}</strong>: {alert.msg}
                    </div>) : (<></>)
            }

        </div>
    )
}

export default Alert;
