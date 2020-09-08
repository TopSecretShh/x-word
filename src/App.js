import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

import PATTERNONE from "./Patterns.js";
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
      // this works but maybe shouldn't? we're modifying state without calling setState?
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
    // console.log(this.state.blocks);
  };

  handleDoubleClick = () => {
    // maybe change from double click to if already selected and click, change orientation?
    this.setState((prevState) => {
      return {
        orientationIsHorizontal: !prevState.orientationIsHorizontal,
      };
    });
  };

  handleKeydown = (e) => {
    const cell = this.state.selectedCell;
    const blocks = this.state.blocks;

    if (e.key === "." && (cell || cell === 0)) {
      this.fillCell(cell);
    }
    // keyCode is depreciated, need to change
    // if (e.keyCode >= 65 && e.keyCode <= 90) {
    //   this.fillCell(cell, e.key);
    // }
    if (e.key.match(/^[a-z]+$/)) {
      this.fillCell(cell, e.key);
    }
    if (e.key.match(/\s/g)) {
      if (this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: false,
        });
      } else if (!this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: true,
        });
      }
    }
    // need to stop  up/down arrows from navigating off the grid and wrapping to next row
    if (e.key === "ArrowRight") {
      if (
        ((cell + 1) / this.state.cols) % 2 === 0 ||
        ((cell + 1) / this.state.cols) % 2 === 1
      ) {
        console.log("right edge");
      } else {
        this.setState({
          selectedCell: cell + 1,
        });
      }
    }
    if (e.key === "ArrowLeft") {
      if (
        cell === 0 ||
        (cell / this.state.cols) % 2 === 0 ||
        (cell / this.state.cols) % 2 === 1
      ) {
        console.log("left edge");
      } else {
        this.setState({
          selectedCell: cell - 1,
        });
      }
    }
    if (e.key === "ArrowUp") {
      this.setState({
        selectedCell: cell - this.state.cols,
      });
    }
    // for some reason this doesn't work in custom grids
    if (e.key === "ArrowDown") {
      this.setState({
        selectedCell: cell + this.state.cols,
      });
    }

    if (e.key === "Backspace") {
      if (this.state.orientationIsHorizontal) {
        if (typeof this.state.blocks[cell] === "string") {
          // this works but maybe shouldn't? we're modifying state without calling setState?
          blocks[cell] = false;
        }
        this.setState({
          selectedCell: cell - 1,
        });
      } else {
        this.setState({
          selectedCell: cell - this.state.cols,
        });
      }
    }
    console.log(e.key);
  };

  selectWord = (selectedCell) => {
    const horizontal = this.state.orientationIsHorizontal;
    if (horizontal) {
      const allCells = this.state.blocks;

      for (let j = selectedCell; j > 0; j--) {
        if (allCells[j]) {
          console.log("lower block: ", j);
          break;
        }
      }
      console.log("selectedCell: ", selectedCell);
      for (let i = selectedCell; i < allCells.length; i++) {
        if (allCells[i]) {
          console.log("upper block: ", i);
          break;
        }
      }

      // highlight all cells between the upper and lower blocks
      // highlightedCells get highlighted class
    } else if (!horizontal) {
      // find nearest block above selectedCell
      // selectedCell[cellNumber] - 15
      // find nearest block below selectedCell
      // highlight all cells between the two blocks
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
      selectWord: this.selectWord,
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
