import React from 'react';
import Context from '../Context/Context';

const PuzzleHeader = () => (
    <Context.Consumer>
        {({currentUser, title}) => (
            <header>
            <h1>{title}</h1>
            <p>by {currentUser}</p>
        </header>
        )}
    </Context.Consumer>
    
)
export default PuzzleHeader