import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Context from "./Context";
import "./App.css";

/*
PROBLEMS
Blocking a lettered square or lettering a block square, does not work symmetrically
Too many columns extend beyond area
sometimes, not always: can't select a cell that has a letter in it
*/

/*
BEN THOUGHTS
maybe need to differentiate between selected cell and highlighted?
when you click a cell it is hightlight blue and has a blue border. when you enter a letter the next cell is highlighted, but the border remains
tab moves the border
 */

/*
 KEY BINDINGS
keyboard bindings (feel free to adjust this, just compiling a list from using existing online tools and what intuitively makes sense to my little brain):

- . = block
- space = change orientation
- tab & enter = next across/down word, depending on current orientation. skips next word if filled in aka 'next word' = next empty word. if next word is incomplete, highlight and select first empty cell in word. if last across word, next word = first empty down word and vice versa
- arrow keys = navigate currently selected cell, orientation remains unchanged. if encounter block, jump all consecutive blocks to next non-block cell
- delete = if letter in cell, delete letter from cell. if no letter in cell, delete letter in previous cell and select that same cell. Previous cell dictated by current orientation
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
    //     highlighted: false
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
