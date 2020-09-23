import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const LoginRegister = (props) => {
    console.log('here? ', props, Login)
    //this is the page apearing when doing the signing process...it will be bigger once we start working on auth set up
    return (
        <div>
            <Login />
            <SignUp />
        </div>
    )
}

export default LoginRegister;