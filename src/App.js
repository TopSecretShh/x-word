import React from "react";
import { Route, Switch } from "react-router-dom";

import { users, userPuzzles } from "./Context/tempUsersData";

import Nav from "./Components/Nav/Nav";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import PuzzleEditor from "./Pages/PuzzleEditor";
import Context from "./Context/Context";
import "./App.css";

/*
PROBLEMS/ISSUES/ROOM FOR IMPROVEMENT

- TODO clicking fill words to fill grid takes focus away from grid. You have to click on the grid again to re-focus. Not sure if there's anything we can do about this?

- TODO Next step: be able to 'save' a puzzle. This is going to require:
  - this.state.cells (blocks + filled in letters. maybe save a version with and a version without letters)
  - the clues. currently these are stored nowhere. probably have to chance clues to a class component? or use hooks to use state in the current functional component

  - TODO does double-click still work?
*/

export default class App extends React.Component {
  static contextType = Context;

  state = {
    users: users,
    currentUser: "",
    userPuzzles: [],

    rows: "",
    cols: "",
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

  setUserPuzzles = (username) => {
    const puzzles = userPuzzles.filter((p) => p.username === username);
    this.setState({
      userPuzzles: puzzles,
    });
  };

  updateUserPuzzles = (newPuzzleSave) => {
    if (userPuzzles.find((p) => p.id === newPuzzleSave.id)) {
      const newPuzzles = userPuzzles.map((p) =>
        p.id === newPuzzleSave.id ? newPuzzleSave : p
      );
      this.setState({
        userPuzzles: newPuzzles,
      });
    } else {
      this.setState({
        userPuzzles: [...userPuzzles, newPuzzleSave],
      });
    }
  };

  signOut = () => {
    this.setState({
      currentUser: "",
    });
  };
  /* user and sign in/out */

  /* puzzle */
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
  /* puzzle */

  render() {
    const value = {
      users: this.state.users,
      currentUser: this.state.currentUser,
      userPuzzles: this.state.userPuzzles,
      addNewUser: this.addNewUser,
      setCurrentUser: this.setCurrentUser,
      setUserPuzzles: this.setUserPuzzles,
      signOut: this.signOut,
    };
    return (
      <Context.Provider value={value}>
        <div className="App">
          <nav>
            <Nav />
          </nav>
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
                  updateUserPuzzles={this.updateUserPuzzles}
                />
              )}
            />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}
