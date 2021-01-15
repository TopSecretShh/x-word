import React from "react";
import { Route, Switch } from "react-router-dom";

// import { users, userPuzzles } from "./Context/tempUsersData";

import Nav from "./Components/Nav/Nav";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import PuzzleEditor from "./Pages/PuzzleEditor";
import Context from "./Context/Context";
import "./App.css";
import GetApiService from "./Services/get-api-service";
import TokenService from "./Services/token-service";

/*
PROBLEMS/ISSUES/ROOM FOR IMPROVEMENT

- TODO clicking fill words to fill grid takes focus away from grid. You have to click on the grid again to re-focus. Not sure if there's anything we can do about this?

*/

export default class App extends React.Component {
  static contextType = Context;

  state = {
    // users: users,
    currentUser: {},
    userPuzzles: [],

    rows: "",
    cols: "",
    puzzleTitle: "Untitled",

    cell_id: [],
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

  setUserPuzzles = (userId) => {
    GetApiService.getUserPuzzles(userId).then(this.setUserPuzzles);
    // this.setState({
    //   userPuzzles: puzzles,
    // });
  };

  updateUserPuzzles = (newPuzzleSave) => {
    if (this.state.userPuzzles.find((p) => p.id === newPuzzleSave.id)) {
      const newPuzzles = this.state.userPuzzles.map((p) =>
        p.id === newPuzzleSave.id ? newPuzzleSave : p
      );
      this.setState({
        userPuzzles: newPuzzles,
      });
    } else {
      this.setState({
        userPuzzles: [...this.state.userPuzzles, newPuzzleSave],
      });
    }
  };

  signOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    this.setState({
      currentUser: {},
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
    let cell_id = [];

    cells.forEach((_, i) => {
      cell_id.push(i);
    });

    this.setState({
      cell_id,
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
            {/* <Route path="/login" component={Login} /> */}
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  setCurrentUser={this.setCurrentUser}
                  setUserPuzzles={this.setUserPuzzles}
                />
              )}
            />
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
                  cell_id={this.state.cell_id}
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
