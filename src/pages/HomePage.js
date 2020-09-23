import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import PuzzlePage from "./PuzzlePage";
import { Route, Switch } from "react-router-dom";

const HomePage = (props) => {
    return (
        <div className='Home'>
            <nav>
                <Header />
                <Nav />
            </nav>

            <main>
                <Route exact path='/puzzle' component={PuzzlePage} />
            </main>
        </div>
    )
}

export default HomePage;