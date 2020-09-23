import React from 'react';
import Context from '../Context/Context';
import { useContext } from 'react'

const PuzzleHeader = () => {
    //react hook:
    const { currentUser, title } = useContext(Context);
    
    return (
        <header>
            <h1>{title}</h1>
            <p>by {currentUser}</p>
        </header>
    )
    }
export default PuzzleHeader