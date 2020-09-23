import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage'
import LoginRegister from "./pages/LoginRegister";
import Login from './components/Login'; 

import "./App.css";

/*
PROBLEMS/ISSUES/ROOM FOR IMPROVEMENT
- Ben is going to drop little TODO notes on things he's planning to work on soon. Feel free to work on those or not as you like, just remove the TODO if you finish it off.

- try this: set orientation to not horizontal, select last cell in first col. pick a letter, any letter, hit it once to fill cell, twice to add a new row/number to across clues, three times for an error 
- also this (probably related): orientation horizontal, (small custom size makes this more obvious). start in the last cell and add letters. it adds more rows, I think, or at least more numbers appear in the across clues
- Chris - The two errors above may be in the fillCell method in PuzzleEditor.js, which as you noted, is mutating state directly. I must fix it, even if it isn't the cause of the strange behavior above. The symmetry issue noted below is definitely located in fillCell, but I almost have it fixed

- sometimes, not always: can't select a cell that has a letter in it

- TODO freeze blocks button (I think a freeze option/button for the blocks was mentioned, right? Seems like a good idea: that way you can enter letters without accidentally overwriting blocks)

- Chris - All symmetry issues fixed
!!!!!!CAREFUL!!!!!!
I completely changed all blank, unblocked cells to be true. Everything dependent on this has also been changed. I did this so when truthy strings are changed to the opposite value, they'll become blocks
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
