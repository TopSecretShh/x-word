import React from "react";
import { Redirect } from "react-router-dom";
import Context from "./Context";
import Cell from "./Cell";
import Clues from "./Clues";
import PATTERNONE from "./Patterns.js";
import Fills from "./Fills";

export default class PuzzleEditor extends React.Component {
  static contextType = Context;

  state = {
    rows: 15,
    cols: 15,
    title: "Untitled",
    custom: false,
    blocks: Array(225).fill(false),
    selectedCell: null,
    selectedAnswer: [],
    highlightedCells: null,
    orientationIsHorizontal: true,
  };

  /* BEGIN PUZZLE OPTIONS (sizing, pattern) */
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
      Number(e.target.rows.value),
      parseInt(e.target.cols.value)
    );

    this.setState({
      rows: parseInt(e.target.rows.value),
      cols: parseInt(e.target.cols.value),
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
  /* END PUZZLE OPTIONS (sizing, pattern) */

  selectCell = (value) => {
    this.setState({
      selectedCell: value,
    });
  };

  selectAnswer = ({ across, down }) => {
    this.setState((prevState) => ({
      selectedAnswer: prevState.orientationIsHorizontal ? across : down,
    }));
  };

  handleDoubleClick = () => {
    // maybe change from double click to if already selected and click, change orientation? unnecessary?
    this.setState((prevState) => {
      return {
        orientationIsHorizontal: !prevState.orientationIsHorizontal,
      };
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
  };

  handleKeydown = (e) => {
    const cell = this.state.selectedCell;
    const blocks = this.state.blocks;

    if (e.key === "." && (cell || cell === 0)) {
      this.fillCell(cell);
    }
    if (e.key.match(/^[a-z]+$/)) {
      this.fillCell(cell, e.key);
    }
    // TODO space bar scrolls to bottom of page (must be default behavior, how do we turn it off?)
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
    // TODO up/down arrows scroll the browser window (must be default behavior, how do we turn it off?)
    if (e.key === "ArrowUp") {
      if (cell > this.state.cols - 1) {
        this.setState({
          selectedCell: cell - this.state.cols,
        });
      }
    }
    if (e.key === "ArrowDown") {
      if (cell < this.state.cols * this.state.rows - this.state.cols)
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
        if (
          cell === 0 ||
          (cell / this.state.cols) % 2 === 0 ||
          (cell / this.state.cols) % 2 === 1
        ) {
          this.setState({
            selectedCell: cell,
          });
        } else {
          this.setState({
            selectedCell: cell - 1,
          });
        }
      } else {
        if (typeof this.state.blocks[cell] === "string") {
          // this works but maybe shouldn't? we're modifying state without calling setState?
          blocks[cell] = false;
        }
        if (cell > this.state.cols - 1) {
          console.log("not top edge");
          this.setState({
            selectedCell: cell - this.state.cols,
          });
        } else {
          this.setState({
            selectedCell: cell,
          });
        }
      }
    }
  };

  renderGrid = (cellNumber, cells) => {
    let cols = this.state.cols;
    let blocks = this.state.blocks;

    let grid = blocks.map((block, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          cellNumber={i}
          selectCell={this.selectCell}
          selectedCell={i === this.state.selectedCell}
          selectAnswer={this.selectAnswer}
          selectedAnswer={this.state.selectedAnswer.includes(i)}
          blocked={block === true}
          cellCharacterLabel={block}
          cellNumberLabel={cellNumber[i]}
          handleKeydown={this.handleKeydown}
          handleDoubleClick={this.handleDoubleClick}
          highlightedCells={this.state.highlightedCells}
          cells={cells[i]}
        />
      );
    });
    return grid;
  };

  /* BEGIN NEW STUFF */
  checkLength = (clue, direction) => {
    let { cols, rows, blocks } = this.state;
    let arr = [clue];

    if (direction === "across") {
      for (let i = clue + 1; blocks[i] !== true && i % cols !== 0; i++) {
        arr.push(i);
      }
    }

    if (direction === "down") {
      for (
        let i = clue + cols;
        blocks[i] !== true && i < rows * cols;
        i += cols
      ) {
        arr.push(i);
      }
    }
    return arr;
  };
  /* END NEW STUFF */

  render() {
    const user = this.context.currentUser;

    const rows = this.state.rows;
    const cols = this.state.cols;
    const width = cols * 33;
    const height = rows * 33;
    const custom = this.state.custom;

    const blocks = this.state.blocks;
    let counter = 0;
    let cellOrientation = [];
    let cellNumber = [];

    /* BEGIN NEW STUFF */
    let downAnswers = [];
    let acrossAnswers = [];
    let cells = [];
    /* END NEW STUFF */

    blocks.forEach((_, i) => {
      let isBlockFilled = blocks[i] === true;

      let isBlockBeforeFilled = blocks[i - 1] === true || i % cols === 0;

      let isBlockAfterFilled = blocks[i + 1] === true || (i + 1) % cols === 0;

      let isBlockAboveFilled = blocks[i - cols] === true || i - cols < 0;

      let isBlockBelowFilled =
        blocks[i + cols] === true || i + cols >= rows * cols;

      /* BEGIN NEW STUFF */
      cells.push({
        id: i,
        block: this.state.blocks[i], // May not be needed
        number: null,
        character: this.state.blocks[i] ? this.state.blocks[i] : "", // May not be needed
        across: findSiblings(i, "across"),
        down: findSiblings(i, "down"),
      });

      function findSiblings(clue, direction) {
        if (blocks[clue] === true) return [];
        let arr = [clue];

        if (direction === "across") {
          for (let i = clue + 1; blocks[i] !== true && i % cols !== 0; i++) {
            arr.push(i);
          }
          if (clue % cols !== 0) {
            for (
              let i = clue - 1;
              i >= 0 && blocks[i] !== true && (i + 1) % cols !== 0;
              i--
            ) {
              arr.push(i);
            }
          }
        }

        if (direction === "down") {
          for (let i = clue - cols; blocks[i] !== true && i >= 0; i -= cols) {
            arr.push(i);
          }
          for (
            let i = clue + cols;
            blocks[i] !== true && i < rows * cols;
            i += cols
          ) {
            arr.push(i);
          }
        }

        return arr.sort();
      }

      /* END NEW STUFF */

      if (isBlockFilled) {
        cellOrientation.push(null);
        cellNumber.push(null);
        /* BEGIN NEW STUFF */
        cells[i].block = true;
        /* END NEW STUFF */
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
        /* BEGIN NEW STUFF */
        cells[i].number = counter;
        downAnswers.push(this.checkLength(i, "down"));
        acrossAnswers.push(this.checkLength(i, "across"));
        /* END NEW STUFF */
      } else if (isBlockBeforeFilled && !isBlockAfterFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("across");
        /* BEGIN NEW STUFF */
        cells[i].number = counter;
        acrossAnswers.push(this.checkLength(i, "across"));
        /* END NEW STUFF */
      } else if (isBlockAboveFilled && !isBlockBelowFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("down");
        /* BEGIN NEW STUFF */
        cells[i].number = counter;
        downAnswers.push(this.checkLength(i, "down"));
        /* END NEW STUFF */
      } else {
        cellOrientation.push(null);
        cellNumber.push(null);
      }
    });

    /* BEGIN NEW STUFF */
    let highlights = this.state.highlightedCells || [];
    let word = highlights.map((cell) => {
      return blocks[cell];
    });
    /* END NEW STUFF */

    return user ? (
      <div>
        <header>
          <h1>{this.context.title}</h1>
          <p>by {this.context.currentUser}</p>
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

          <div className="crossword__container--grid-wrapper">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMinYMin slice"
              className={`Grid ${
                rows >= cols ? "view_box--tall" : "view_box--wide"
              }`}
              id="grid"
            >
              {this.renderGrid(cellNumber, cells)}
            </svg>
          </div>

          <div>
            {/* not-grid puzzle stuff */}
            <Clues
              cellOrientation={cellOrientation}
              cellNumber={cellNumber}
              selectCell={this.selectCell}
              selectAnswer={this.selectAnswer}
              cells={cells}
            />
            <Fills word={word} />
          </div>
        </main>
      </div>
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
