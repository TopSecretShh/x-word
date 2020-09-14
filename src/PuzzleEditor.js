import React from "react";
import { Redirect } from "react-router-dom";
import Context from "./Context";
import Cell from "./Cell";
import Clues from "./Clues";
import PATTERNONE from "./Patterns.js";
// import Fills from "./Fills";

export default class PuzzleEditor extends React.Component {
  static contextType = Context;

  state = {
    rows: 3,
    cols: 3,
    title: "Untitled",
    custom: false,
    blocks: Array(9).fill(true),
    selectedCell: null,
    orientationIsHorizontal: true
  };

  /* BEGIN PUZZLE OPTIONS (sizing, pattern, clear) */
  setSize = (value) => {
    if (value === "daily") {
      this.setState({
        rows: 15,
        cols: 15,
        blocks: Array(225).fill(true),
        selectedCell: null,
      });
    } else if (value === "sunday") {
      this.setState({
        rows: 21,
        cols: 21,
        blocks: Array(441).fill(true),
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
      blocks: Array(e.target.rows.value * e.target.cols.value).fill(true),
      selectedCell: null,
    });
  };

  handlePatternBtn = () => {
    // TODO PATTERNONE stores any filled cells. this might be a result of how we fill cells? maybe not. added a clear grid button, but users might be weirded out by this?
    console.log("pattern: ", PATTERNONE);
    if (this.state.rows === 15) {
      this.setState({
        blocks: PATTERNONE,
      });
    }
  };

  handleClearLetters = () => {
    let grid = this.state.blocks;
    let emptyGrid = grid.map((cell) =>
      typeof cell === "string" ? (cell = true) : cell
    );
    this.setState({
      blocks: emptyGrid,
    });
  };

  handleClearGrid = () => {
    this.setState({
      blocks: Array(this.state.rows * this.state.cols).fill(true),
    });
  };

  /* END PUZZLE OPTIONS (sizing, pattern, clear) */

  selectCell = (value) => {
    this.setState({
      selectedCell: value,
    });
  };

  // selectAnswer = ({ across, down }) => {
  //   this.setState((prevState) => ({
  //     selectedAnswer: prevState.orientationIsHorizontal ? across : down,
  //   }));
  // };

  handleDoubleClick = (input) => {
    if (input !== undefined) {
      this.setState({
        orientationIsHorizontal: input,
      });
    } else {
      this.setState((prevState) => {
        return {
          orientationIsHorizontal: !prevState.orientationIsHorizontal,
        };
      });
    }
  };

  updateCell = (cell, character, cellTwinNumber) => {
    let blocksCopy = [...this.state.blocks]; // Creates deep copy
    blocksCopy[cell] = character || !blocksCopy[cell]

    if (character) {
      if (typeof blocksCopy[cellTwinNumber] !== 'string') {
        blocksCopy[cellTwinNumber] = true
      }
    } else if (cellTwinNumber !== cell) {
      blocksCopy[cellTwinNumber] = !blocksCopy[cellTwinNumber]
    }

    this.setState({
      blocks: blocksCopy,
    })
  };

  fillCell = (cell, character) => {
    const {
      rows,
      cols,
      orientationIsHorizontal
    } = this.state;
    const totalSquares = rows * cols - 1;
    const cellTwinNumber = totalSquares - cell;
    const nextCell = orientationIsHorizontal
      ? cell + 1
      : cell + cols;

    if (character) {
      character = character.toUpperCase()
      this.setState({
        selectedCell: nextCell
      })
    }

      this.updateCell(cell, character, cellTwinNumber);
  };

  handleKeydown = (e) => {
    const cell = this.state.selectedCell;

    if (e.key === "." && (cell || cell === 0)) {
      this.fillCell(cell);
    }
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
          // TODO this works but maybe shouldn't? we're modifying state without calling setState?
          // blocks[cell] = false;

          let newBlocks = this.updateCell(cell, true);

          this.setState({
            blocks: newBlocks,
          });
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
          // TODO this works but maybe shouldn't? we're modifying state without calling setState?
          // blocks[cell] = false;

          let newBlocks = this.updateCell(cell, false);

          this.setState({
            blocks: newBlocks,
          });
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
    e.preventDefault();
  };

  renderGrid = (cellNumber, cells, selectedAnswer) => {
    let cols = this.state.cols;
    let blocks = this.state.blocks;

    let grid = blocks.map((block, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          selectCell={this.selectCell}
          selectedCell={i === this.state.selectedCell}
          blocked={block}
          cellCharacterLabel={block}
          cellNumberLabel={cellNumber[i]}
          handleKeydown={this.handleKeydown}
          handleDoubleClick={this.handleDoubleClick}
          highlightedCells={this.state.highlightedCells}
          cells={cells[i]}
          selectedAnswer={selectedAnswer}
        />
      );
    });
    return grid;
  };

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

    let groupAcross = [];
    let groupDown = [];
    let cells = [];

    blocks.forEach((_, i) => {
      let isBlockFilled = blocks[i] === false;

      let isBlockBeforeFilled = blocks[i - 1] === false || i % cols === 0;

      let isBlockAfterFilled = blocks[i + 1] === false || (i + 1) % cols === 0;

      let isBlockAboveFilled = blocks[i - cols] === false || i - cols < 0;

      let isBlockBelowFilled =
        blocks[i + cols] === false || i + cols >= rows * cols;

      cells.push({
        id: i,
        block: this.state.blocks[i], // May not be needed
        number: null,
        character: this.state.blocks[i] ? this.state.blocks[i] : "", // May not be needed
      });

      function findSiblings(clue, direction) {
        if (blocks[clue] === false) return [];
        let arr = [clue];

        if (direction === "across") {
          for (let i = clue + 1; blocks[i] !== false && i % cols !== 0; i++) {
            arr.push(i);
          }
          if (clue % cols !== 0) {
            for (
              let i = clue - 1;
              i >= 0 && blocks[i] !== false && (i + 1) % cols !== 0;
              i--
            ) {
              arr.push(i);
            }
          }
        }

        if (direction === "down") {
          for (let i = clue - cols; blocks[i] !== false && i >= 0; i -= cols) {
            arr.push(i);
          }
          for (
            let i = clue + cols;
            blocks[i] !== false && i < rows * cols;
            i += cols
          ) {
            arr.push(i);
          }
        }

        return arr.sort();
      }

      if (isBlockFilled) {
        cellOrientation.push(null);
        cellNumber.push(null);
        cells[i].block = false;
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
        cells[i].number = counter;
        groupAcross.push(findSiblings(i, "across"));
        groupDown.push(findSiblings(i, "down"));
      } else if (isBlockBeforeFilled && !isBlockAfterFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("across");
        cells[i].number = counter;
        groupAcross.push(findSiblings(i, "across"));
      } else if (isBlockAboveFilled && !isBlockBelowFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("down");
        cells[i].number = counter;
        groupDown.push(findSiblings(i, "down"));
      } else {
        cellOrientation.push(null);
        cellNumber.push(null);
      }
    });

    let group =
      (this.state.orientationIsHorizontal ? groupAcross : groupDown) || [];

    let selectedAnswer =
      group.find(g => g.some((x) => x === this.state.selectedCell)) || [];

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
            <div className="clear-grid-btn">
              <h3>Clear</h3>
              <button type="button" onClick={() => this.handleClearLetters()}>
                Clear Letters
              </button>
              <button type="button" onClick={() => this.handleClearGrid()}>
                Clear Grid
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
              {this.renderGrid(cellNumber, cells, selectedAnswer)}
            </svg>
          </div>

          <div>
            <Clues
              cellOrientation={cellOrientation}
              cellNumber={cellNumber}
              selectCell={this.selectCell}
              handleDoubleClick={(direction) =>
                this.handleDoubleClick(direction)
              }
              cells={cells}
            />
            {/* <Fills word={word} /> */}
          </div>
        </main>
      </div>
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
