import React from "react";
import Context from "./Context";

import Grid from "./Grid";
import Clues from "./Clues";
import PATTERNONE from "./Patterns";

import "./App.css";

export default class Home extends React.Component {
  static contextType = Context;

  state = {
    rows: 15,
    cols: 15,
    title: "Untitled",
    author: "Anonymous",
    custom: false,
    blocks: Array(225).fill(false),
    selectedCell: null,
    orientationIsHorizontal: true,
  };

  /* BEGIN GRID SIZE */
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
    this.setState({
      rows: e.target.rows.value,
      cols: e.target.cols.value,
      blocks: Array(e.target.rows.value * e.target.cols.value).fill(false),
      selectedCell: null,
    });
  };
  /* END GRID SIZE */

  /* BEGIN PATTERN */
  handlePatternBtn = () => {
    if (this.state.rows === 15) {
      this.setState({
        blocks: PATTERNONE,
      });
    }
  };
  /* END PATTERN */

  /* BEGIN KEYBOARD HANDLER */
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
  /* END KEYBOARD HANDLER */

  /* BEGIN CELL STUFF */
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
    const blocks = this.state.blocks;
    const nextCell = this.state.orientationIsHorizontal
      ? cell + 1
      : cell + cols;

    if (typeof character === "string") {
      blocks[cell] = character.toUpperCase();
      this.setState({
        selectedCell: nextCell,
      });
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
  /* END CELL STUFF */

  render() {
    const custom = this.state.custom;

    let rows = this.state.rows;
    let cols = this.state.cols;
    let blocks = this.state.blocks;
    let counter = 0;
    let cellOrientation = [];
    let cellNumber = [];

    blocks.forEach((_, i) => {
      let isBlockFilled = blocks[i] === true;

      let isBlockBeforeFilled = blocks[i - 1] === true || i % cols === 0;

      let isBlockAfterFilled = blocks[i + 1] === true || (i + 1) % cols === 0;

      let isBlockAboveFilled = blocks[i - cols] === true || i - cols < 0;

      let isBlockBelowFilled =
        blocks[i + cols] === true || i + cols >= rows * cols;

      if (isBlockFilled) {
        cellOrientation.push(null);
        cellNumber.push(null);
        return;
      }
      if (
        isBlockAboveFilled &&
        isBlockBeforeFilled &&
        !isBlockAfterFilled &&
        !isBlockBelowFilled
      ) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("acrossdown"); // This should add down and across, not 'acrossdown'
      } else if (isBlockBeforeFilled && !isBlockAfterFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("across");
      } else if (isBlockAboveFilled && !isBlockBelowFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("down");
      } else {
        cellOrientation.push(null);
        cellNumber.push(null);
      }
    });

    return (
      <div className="Home">
        <header>
          <h1>{this.context.title}</h1>
          <p>by {this.context.author}</p>
        </header>

        <main>
          <div className="puzzle-options">
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
                      <input type="number" name="rows" min={3} max={25} />
                    </label>
                    <br />
                    <label>
                      # of columns:{" "}
                      <input type="number" name="cols" min={3} max={25} />
                    </label>
                    <br />
                    <button type="submit">Enter</button>
                  </fieldset>
                </form>
              ) : (
                ""
              )}
            </div>
            <div className="pattern-btn">
              <h3>Pattern</h3>
              <button type="button" onClick={() => this.handlePatternBtn()}>
                Pattern
              </button>
            </div>
          </div>

          <div className="puzzle">
            <Grid
              selectedCell={this.state.selectedCell}
              selectCell={(cell) => this.selectCell(cell)}
              blocks={this.state.blocks}
              cellNumber={cellNumber}
              inputCell={(cell) => this.handleKeydown(cell)}
            />
            <Clues cellOrientation={cellOrientation} cellNumber={cellNumber} />
          </div>
        </main>
      </div>
    );
  }
}
