import React, { useState } from 'react';
import UserContext from './UserContext';

const UserState = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({});

    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
