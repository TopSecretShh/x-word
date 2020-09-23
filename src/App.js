import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage'
import LoginRegister from "./pages/LoginRegister";
import Login from './components/Login'; 

import "./App.css";

/*
PROBLEMS/ISSUES/ROOM FOR IMPROVEMENT
- Ben is going to drop little TODO notes on things he's planning to work on soon. Feel free to work on those or not as you like, just remove the TODO if you finish it off.

- sometimes, not always: can't select a cell that has a letter in it -> you can't select the cell by clicking on the letter itself, you have to click on the cell behind/next to the letter

*/

const App = () => {
  return (
    <div className="App">
      {/* <Switch> */}
      
      <Route path='/' component={HomePage} />
      <Route exact path="/signin" component={LoginRegister} />
      <Route exact path='/login' component={Login} />
      {/* </Switch> */}
    </div>
  );
}
export default App;
