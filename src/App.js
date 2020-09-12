import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Context from "./Context";
import "./App.css";

/*
PROBLEMS/ISSUES/ROOM FOR IMPROVEMENT
- Ben is going to drop little TODO notes on things he's planning to work on soon. Feel free to work on those or not as you like, just remove the TODO if you finish it off.

- try this: set orientation to not horizontal, select last cell in first col. pick a letter, any letter, hit it once to fill cell, twice to add a new row/number to across clues, three times for an error 
- also this (probably related): orientation horizontal, (small custom size makes this more obvious). start in the last cell and add letters. it adds more rows, I think, or at least more numbers appear in the across clues
- Chris - The two errors above may be in the fillCell method in PuzzleEditor.js, which as you noted, is mutating state directly. I must fix it, even if it isn't the cause of the strange behavior above. The symmetry issue noted below is definitely located in fillCell, but I almost have it fixed

- sometimes, not always: can't select a cell that has a letter in it

*/

export default class App extends React.Component {
  static contextType = Context;

  state = {
    users: [
      { id: 0, username: "Bob", password: "bob" },
      {
        id: 1,
        username: "Jon",
        password: "jon",
      },
    ],
    currentUser: "",
  };

  addNewUser = (username, password) => {
    const newUser = {
      id: this.state.users.length + 1,
      username: username,
      password: password,
    };

    this.setState({
      users: [...this.state.users, newUser],
    });
  };

  setCurrentUser = (username) => {
    this.setState({
      currentUser: username,
    });
  };

  render() {
    const value = {
      users: this.state.users,
      currentUser: this.state.currentUser,
      addNewUser: this.addNewUser,
      setCurrentUser: this.setCurrentUser,
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}
