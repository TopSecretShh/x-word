import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

import PATTERNONE from "./Patterns.js";
import Context from "./Context";
import "./App.css";

// Problems
// Blocking a lettered square or lettering a block square, does not work symmetrically
// Sunday letter and number positioning
// Too many columns extend beyond area
// can't select a cell that has a letter in it

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

    rows: 15,
    cols: 15,
    title: "Untitled",
    custom: false,
    blocks: Array(225).fill(false),
    selectedCell: null,
    orientationIsHorizontal: true,

    // grid/blocks: [
    //   {
    //     id: 0,
    //     block: false,
    //     number: "",
    //     letter: "",
    //   },
    // ],
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

  setSize = (value) => {
    if (value === "daily") {
      this.setState({
        rows: 15,
        cols: 15,
        blocks: Array(225).fill(false),
        selectedCell: null,
      });
    } else if (value === "sunday") {
      this.setState({
        rows: 21,
        cols: 21,
        blocks: Array(441).fill(false),
        selectedCell: null,
      });
    } else if (value === "custom") {
      this.setState({
        custom: true,
      });
    }
    if (this.state.custom) {
      this.setState({
        custom: false,
      });
    }
  };

  handleSubmitCustom = (e) => {
    console.log(
      "custom dimensions: ",
      e.target.rows.value,
      e.target.cols.value
    );

    this.setState({
      rows: e.target.rows.value,
      cols: e.target.cols.value,
      blocks: Array(e.target.rows.value * e.target.cols.value).fill(false),
      selectedCell: null,
    });
  };

  handlePatternBtn = () => {
    if (this.state.rows === 15) {
      this.setState({
        blocks: PATTERNONE,
      });
    }
  };

  selectCell = (value) => {
    this.setState({
      selectedCell: value,
    });
  };

  fillCell = (cell, character) => {
    const rows = this.state.rows;
    const cols = this.state.cols;
    const totalSquares = rows * cols - 1;
    const cellTwin = totalSquares - cell; // At 15 rows 10 cols for example, middle symmetry doesn't work
    const blocks = this.state.blocks;
    const nextCell = this.state.orientationIsHorizontal
      ? cell + 1
      : cell + cols;

    if (typeof character === "string") {
      blocks[cell] = character.toUpperCase();
      this.setState({
        selectedCell: nextCell,
      });
      if (blocks[cellTwin] === true) blocks[cellTwin] = false;
    } else {
      blocks[cell] = !blocks[cell];

      if (cell !== Math.floor(totalSquares / 2)) {
        blocks[cellTwin] = !blocks[cellTwin];
      }
    }

    this.setState({
      blocks: blocks,
    });
    console.log(this.state.blocks);
  };

  handleDoubleClick = () => {
    this.setState((prevState) => {
      return {
        orientationIsHorizontal: !prevState.orientationIsHorizontal,
      };
    });
  };

  handleKeydown = (e) => {
    const cell = this.state.selectedCell;

    if (e.key === "." && (cell || cell === 0)) {
      this.fillCell(cell);
    }
    // keyCode is depreciated, need to change
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      this.fillCell(cell, e.key);
    }
  };

  render() {
    const value = {
      addNewUser: this.addNewUser,
      setCurrentUser: this.setCurrentUser,
      currentUser: this.state.currentUser,
      users: this.state.users,
      rows: this.state.rows,
      cols: this.state.cols,
      custom: this.state.custom,
      blocks: this.state.blocks,
      title: this.state.title,
      selectedCell: this.state.selectedCell,
      selectCell: this.selectCell,
      setSize: this.setSize,
      handleSubmitCustom: this.handleSubmitCustom,
      handlePatternBtn: this.handlePatternBtn,
      handleKeydown: this.handleKeydown,
      handleDoubleClick: this.handleDoubleClick,
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
