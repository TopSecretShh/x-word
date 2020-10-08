import React from "react";
import { Route, Switch } from "react-router-dom";

import { users } from "./tempUsersData";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import PuzzleEditor from "./PuzzleEditor";
import Context from "./Context";
import "./App.css";

/*
PROBLEMS/ISSUES/ROOM FOR IMPROVEMENT
- Ben is going to drop little TODO notes on things he's planning to work on soon. Feel free to work on those or not as you like, just remove the TODO if you finish it off.

- TODO incorporate component structure from branch refactor/controls-component

- TODO clicking fill words to fill grid takes focus away from grid. You have to click on the grid again to re-focus. Not sure if there's anything we can do about this? Possible solution: auto-find fills based on selectedCell. That's how Phil works

*/

export default class App extends React.Component {
  static contextType = Context;

  state = {
    users: users,
    currentUser: "",

    rows: 3,
    cols: 3,
    puzzleTitle: "Untitled",

    cellId: [],
  };

  /* user and sign in/out */
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

  signOut = () => {
    this.setState({
      currentUser: "",
    });
  };
  /* user and sign in/out */

  /* puzzle dismensions */
  updateRows = (value) => {
    this.setState({
      rows: Number(value),
    });
  };

  updateCols = (value) => {
    this.setState({
      cols: Number(value),
    });
  };

  setDailySize = () => {
    this.setState({
      rows: 15,
      cols: 15,
    });
  };

  setSundaySize = () => {
    this.setState({
      rows: 21,
      cols: 21,
    });
  };
  /* puzzle dismensions */

  updatePuzzleTitle = (puzzleTitle) => {
    this.setState({
      puzzleTitle,
    });
  };

  createCellIds = () => {
    const cells = Array(this.state.rows * this.state.cols).fill(true);
    let cellId = [];

    cells.forEach((_, i) => {
      cellId.push(i);
    });

    this.setState({
      cellId,
    });
  };

  render() {
    const value = {
      users: this.state.users,
      currentUser: this.state.currentUser,
      addNewUser: this.addNewUser,
      setCurrentUser: this.setCurrentUser,
      signOut: this.signOut,
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route
              path="/home"
              render={(props) => (
                <Home
                  {...props}
                  rows={this.state.rows}
                  cols={this.state.cols}
                  puzzleTitle={this.state.puzzleTitle}
                  updateRows={this.updateRows}
                  updateCols={this.updateCols}
                  setDailySize={this.setDailySize}
                  setSundaySize={this.setSundaySize}
                  updatePuzzleTitle={this.updatePuzzleTitle}
                  createCellIds={this.createCellIds}
                />
              )}
            />
            <Route
              path="/puzzle-editor"
              render={(props) => (
                <PuzzleEditor
                  {...props}
                  rows={this.state.rows}
                  cols={this.state.cols}
                  puzzleTitle={this.state.puzzleTitle}
                  cellId={this.state.cellId}
                />
              )}
            />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}
