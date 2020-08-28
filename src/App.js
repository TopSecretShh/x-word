import React from "react";
import Grid from "./Grid";
import Clues from "./Clues";
import PATTERNONE from "./Patterns.js"
import Context from "./Context";
import "./App.css";

// Problems
// Blocking a lettered square or lettering a block square, does not work symmetrically 
// Keydown problems causing crashes
// Sunday letter and number positioning

export default class App extends React.Component {
  static contextType = Context;

  state = {
    rows: 15,
    cols: 15,
    title: "Untitled",
    author: "Anonymous",
    blocks: Array(225).fill(false),
    selectedCell: null,
  };

  
  // Pressing Tab twice is causing TypeError: this.handleKeyDown is not a function
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

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
    }
  };

  handlePatternBtn = () => {
    if (this.state.rows === 15) {
      this.setState({
        blocks: PATTERNONE
      })
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
    const cellTwin = totalSquares - cell;
    const blocks = [...this.state.blocks]; 

    if (typeof character === "string") {

      blocks[cell] = character.toUpperCase()
    } else {
      blocks[cell] = !blocks[cell];
    
      if (cell !== Math.floor(totalSquares / 2)) {
        blocks[cellTwin] = !blocks[cellTwin];
      }
    }

    this.setState({
      blocks: blocks,
    });
    console.log(blocks)
  }

  handleKeydown = (e) => {
    const cell = this.state.selectedCell;

    if (e.code === "Period" && (cell || cell === 0)) {
      this.fillCell(cell)
    }

    if (e.keyCode >= 65 && e.keyCode <= 90) {
      this.fillCell(cell, e.key)
    }

  }

  render() {
    const value = {
      rows: this.state.rows,
      cols: this.state.cols,
      title: this.state.title,
      author: this.state.author,
      selectCell: this.selectCell,
    };

    let rows = this.state.rows;
    let blocks = this.state.blocks;
    let counter = 0;

    // This should add down and across, not 'acrossdown'
    let cellProperties = blocks.map((block, i) => {
      
      let isBlockFilled = block === true;

      let isBlockBeforeFilled = blocks[i - 1] === true || i % rows === 0;

      let isBlockAfterFilled = blocks[i + 1] === true || (i + 1) % rows === 0;

      let isBlockAboveFilled = blocks[i - rows] === true || i - rows < 0;

      let isBlockBelowFilled = blocks[i + rows] === true || i + rows > rows * rows;

       if (isBlockFilled) {
        return [null, null];
      } else if (
        isBlockAboveFilled &&
        isBlockBeforeFilled &&
        !isBlockAfterFilled &&
        !isBlockBelowFilled
      ) {
        counter++;
        return [counter, "acrossdown"];
      } else if (isBlockBeforeFilled && !isBlockAfterFilled) {
        counter++;
        return [counter, "across"];
      } else if (isBlockAboveFilled && !isBlockBelowFilled) {
        counter++;
        return [counter, "down"];
      }

      return [null, null];
    });
    return (
      <Context.Provider value={value}>
        <div className="App" onKeyDown={() => this.handleKeyDown()}>
          <h1>{this.state.title}</h1>
          <p>by {this.state.author}</p>

          <div className="size-btns">
            <h3>Size</h3>
            <button
              type="button"
              value="daily"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Daily
            </button>
            <button
              type="button"
              value="sunday"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Sunday
            </button>
          </div>
          <div className="puzzle">
            <Grid
              selectedCell={this.state.selectedCell}
              selectCell={(cell) => this.selectCell(cell)}
              blocks={this.state.blocks}
              cellProperties={cellProperties}
            />
            <Clues blocks={cellProperties} />
          </div>

          <div className="pattern-btn">
            <h3>Pattern</h3>
            <button type="button" onClick={() => this.handlePatternBtn()}>
              Pattern
            </button>
          </div>
        </div>
      </Context.Provider>
    );
  }
}
