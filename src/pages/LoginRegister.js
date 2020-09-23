import React from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const LoginRegister = (props) => {
    console.log('here? ', props, Login)
    //this is the page apearing when doing the signing process...it will be bigger once we start working on auth set up
    return (
        <div>
            <p>If you already have an account</p>
            <Login />
            <p>or create account to save your puzzles!</p>
            <SignUp />
        </div>
    )
}

export default LoginRegister;