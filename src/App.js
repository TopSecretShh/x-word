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

- sometimes, not always: can't select a cell that has a letter in it -> you can't select the cell by clicking on the letter itself, you have to click on the cell behind/next to the letter

!!!!!!CAREFUL!!!!!!
I completely changed all blank, unblocked cells to be true. Everything dependent on this has also been changed. I did this so when truthy strings are changed to the opposite value, they'll become blocks
-> Ha! I noticed before I saw this note and was very confused for a minute!

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
