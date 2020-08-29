import React from "react";
import Grid from "./Grid";
import Clues from "./Clues";
import Context from "./Context";
import "./App.css";

export default class App extends React.Component {
  static contextType = Context;

  state = {
    rows: 15,
    cols: 15,
    title: "Untitled",
    author: "Anonymous",
    custom: false,
    blocks: Array(225).fill(false),
    selectedCell: null,
  };

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
    } else if (value === "custom") {
      this.setState({
        custom: true,
      });
    }
  };

  handleSubmitCustom = (e) => {
    this.setState({
      rows: e.target.rows.value,
      cols: e.target.cols.value,
    });
  };

  handlePatternBtn = () => {
    if (this.state.rows === 15) {
      this.setState({
        blocks: this.state.blocks
          .fill(true, 4, 5)
          .fill(true, 10, 11)
          .fill(true, 19, 20)
          .fill(true, 25, 26)
          .fill(true, 34, 35)
          .fill(true, 40, 41)
          .fill(true, 55, 56)
          .fill(true, 60, 63)
          .fill(true, 67, 68)
          .fill(true, 72, 75)
          .fill(true, 81, 82)
          .fill(true, 95, 96)
          .fill(true, 101, 102)
          .fill(true, 109, 110)
          .fill(true, 115, 116)
          .fill(true, 123, 124)
          .fill(true, 129, 130)
          .fill(true, 143, 144)
          .fill(true, 150, 153)
          .fill(true, 157, 158)
          .fill(true, 162, 165)
          .fill(true, 171, 172)
          .fill(true, 184, 185)
          .fill(true, 190, 191)
          .fill(true, 199, 200)
          .fill(true, 205, 206)
          .fill(true, 214, 215)
          .fill(true, 220, 221),
      });
    }
  };

  selectCell = (value) => {
    this.setState({
      selectedCell: value,
    });
  };

  handleKeydown = (e) => {
    const cell = this.state.selectedCell;
    const rows = this.state.rows;
    const cols = this.state.cols;
    const totalSquares = rows * cols - 1;
    const cellTwin = totalSquares - cell;
    const blocks = [...this.state.blocks];

    blocks[cell] = !blocks[cell];

    if (cell !== Math.floor(totalSquares / 2)) {
      blocks[cellTwin] = !blocks[cellTwin];
    }

    // This is where the problem was for setting the first square! I put this in to prevent period from working if nothing was selected, but it also prevented it from working with cell = 0!
    if (e.code === "Period" && (cell || cell === 0)) {
      this.setState({
        blocks: blocks,
      });
    }
  };

  render() {
    const value = {
      rows: this.state.rows,
      cols: this.state.cols,
      title: this.state.title,
      author: this.state.author,
      selectCell: this.selectCell,
    };

    const custom = this.state.custom;

    let rows = this.state.rows;
    let blocks = this.state.blocks;
    let counter = 0;

    let cellProperties = blocks.map((block, i) => {
      let isBlockFilled = block;

      let isBlockBeforeFilled = blocks[i - 1] || i % rows === 0;

      let isBlockAfterFilled = blocks[i + 1] || (i + 1) % rows === 0;

      let isBlockAboveFilled = blocks[i - rows] || i - rows < 0;

      let isBlockBelowFilled = blocks[i + rows] || i + rows > rows * rows;

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
            <button
              type="button"
              value="custom"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Custom
            </button>
            {custom ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.handleSubmitCustom(e);
                }}
              >
                <fieldset className="custom-size">
                  <label>
                    # of rows:{"  "}
                    <input type="number" name="rows" min={3} max={30} />
                  </label>
                  <br />
                  <label>
                    # of columns:{" "}
                    <input type="number" name="cols" min={3} max={30} />
                  </label>
                  <br />
                  <button type="submit">Enter</button>
                </fieldset>
              </form>
            ) : (
              ""
            )}
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
