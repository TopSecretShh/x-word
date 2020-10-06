import React from "react";
import { Redirect } from "react-router-dom";
import Context from "./Context";
import Cell from "./Cell";
import Clues from "./Clues";
import generatePattern from "./Patterns";
import Fills from "./Fills/Fills";

export default class PuzzleEditor extends React.Component {
  static contextType = Context;

  state = {
    // rows: 3,
    // cols: 3,
    title: "Untitled",
    custom: false,
    cells: Array(this.props.rows * this.props.cols).fill(true),
    selectedCell: null,
    orientationIsHorizontal: true,
    freezeBlocks: false,
    fills: [],

    cellOrientation: [],
    cellNumber: [],
    cellId: [],

    groupAcross: [],
    groupDown: [],

    selectedAnswer: [],
  };

  /* BEGIN PUZZLE OPTIONS (pattern, freeze, clear) */

  handlePatternBtn = () => {
    const rows = this.props.rows;
    const cols = this.props.cols;
    const freeze = this.state.freezeBlocks;
    const pattern = generatePattern(rows, cols);
    if (!freeze) {
      this.setState({
        cells: pattern,
      });
    }
  };

  handleClearGrid = () => {
    if (!this.state.freezeBlocks) {
      this.setState({
        cells: Array(this.props.rows * this.props.cols).fill(true),
      });
    }
    // TODO there should be an else statement here that shows the user a message to let them know that they cannot clear grid while freeze is enabled
  };

  handleFreezeBlocks = () => {
    this.setState({
      freezeBlocks: true,
    });
    this.createCells();
  };

  handleClearLetters = () => {
    let grid = this.state.cells;
    let emptyGrid = grid.map((cell) =>
      typeof cell === "string" ? (cell = true) : cell
    );
    this.setState({
      cells: emptyGrid,
    });
  };

  /* END PUZZLE OPTIONS (sizing, pattern, freeze, clear) */

  // TODO need to fix a/synchrony issue!
  selectCell = (value) => {
    this.setState(
      {
        selectedCell: value,
      },
      this.createWord()
    );
  };

  createWord = () => {
    let group =
      (this.state.orientationIsHorizontal
        ? this.state.groupAcross
        : this.state.groupDown) || [];
    let selectedAnswer =
      group.find((g) => g.some((x) => x === this.state.selectedCell)) || [];
    let word = [];
    selectedAnswer
      .sort((a, b) => a - b)
      .forEach((i) =>
        typeof this.state.cells[i] === "string"
          ? word.push(this.state.cells[i])
          : word.push("?")
      );
    word = word.join("");

    // TODO this also has a synchrony issue now :(
    this.setState({
      selectedAnswer,
    });

    this.searchWord(word);
  };

  searchWord = (word) => {
    fetch(`https://api.datamuse.com/words?sp=${word}`)
      .then((response) => response.json())
      .then((data) => {
        let words = data.map((word) => (word.score > 100 ? word.word : ""));
        this.setState({
          fills: words,
        });
      });
  };

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
    let cellsCopy = [...this.state.cells];
    cellsCopy[cell] = character || !cellsCopy[cell];

    if (character) {
      if (typeof cellsCopy[cellTwinNumber] !== "string") {
        cellsCopy[cellTwinNumber] = true;
      }
    } else if (cellTwinNumber !== cell) {
      cellsCopy[cellTwinNumber] = !cellsCopy[cellTwinNumber];
    }

    this.setState({
      cells: cellsCopy,
    });
  };

  deleteCellContent = (cell, value) => {
    let cellsCopy = [...this.state.cells];
    cellsCopy[cell] = value;
    this.setState({
      cells: cellsCopy,
    });
  };

  findNextCell = (cell, orientationIsHorizontal) => {
    let nextCell;
    if (orientationIsHorizontal) {
      if (
        ((cell + 1) / this.props.cols) % 2 === 0 ||
        ((cell + 1) / this.props.cols) % 2 === 1
      ) {
        console.log("right edge");
        return cell;
      } else {
        nextCell = cell + 1;
        return nextCell;
      }
    } else {
      if (cell < this.props.cols * this.props.rows - this.props.cols) {
        nextCell = cell + this.props.cols;
        return nextCell;
      } else {
        return cell;
      }
    }
  };

  fillCell = (cell, character) => {
    const { rows, cols } = this.props;
    const { orientationIsHorizontal } = this.state;
    const totalSquares = rows * cols - 1;
    const cellTwinNumber = totalSquares - cell;
    const nextCell = this.findNextCell(cell, orientationIsHorizontal);

    if (character) {
      character = character.toUpperCase();
      this.selectCell(nextCell);
    }

    this.updateCell(cell, character, cellTwinNumber);
  };

  handleKeyDown = (e) => {
    const cell = this.state.selectedCell;
    const freeze = this.state.freezeBlocks;

    if (e.key === "." && (cell || cell === 0) && !freeze) {
      this.fillCell(cell);
    }
    if (e.key.match(/^[a-z]+$/)) {
      if (freeze) {
        this.fillCell(cell, e.key);
      }
    }
    // TODO need to find a way for changing the orientation to reselect the cell (and therefore highlight the correct word, across/down)
    // should use selectCell fn?
    if (e.key.match(/\s/g)) {
      if (this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: false,
        });
        // TODO not sure if this addresses the problem, still non-synchronous
        this.selectCell(cell);
      } else if (!this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: true,
        });
        // TODO not sure if this addresses the problem, still non-synchronous
        this.selectCell(cell);
      }
    }
    if (e.key === "ArrowRight") {
      if (
        ((cell + 1) / this.props.cols) % 2 === 0 ||
        ((cell + 1) / this.props.cols) % 2 === 1
      ) {
        console.log("right edge");
      } else {
        this.selectCell(cell + 1);
      }
    }
    if (e.key === "ArrowLeft") {
      if (
        cell === 0 ||
        (cell / this.props.cols) % 2 === 0 ||
        (cell / this.props.cols) % 2 === 1
      ) {
        console.log("left edge");
      } else {
        this.selectCell(cell - 1);
      }
    }
    if (e.key === "ArrowUp") {
      if (cell > this.props.cols - 1) {
        this.selectCell(cell - this.props.cols);
      }
    }
    if (e.key === "ArrowDown") {
      if (cell < this.props.cols * this.props.rows - this.props.cols) {
        this.selectCell(cell + this.props.cols);
      }
    }
    if (e.key === "Backspace") {
      if (this.state.orientationIsHorizontal) {
        if (typeof this.state.cells[cell] === "string") {
          this.deleteCellContent(cell, true);
        }
        if (
          cell === 0 ||
          (cell / this.props.cols) % 2 === 0 ||
          (cell / this.props.cols) % 2 === 1
        ) {
          this.selectCell(cell);
        } else {
          this.selectCell(cell - 1);
        }
      } else {
        if (typeof this.state.cells[cell] === "string") {
          this.deleteCellContent(cell, true);
        }
        if (cell > this.props.cols - 1) {
          this.selectCell(cell - this.props.cols);
        } else {
          this.selectCell(cell);
        }
      }
    }
    e.preventDefault();
  };

  renderGrid = () => {
    const cellNumber = this.state.cellNumber;
    const cellId = this.state.cellId;
    const selectedAnswer = this.state.selectedAnswer;

    let cols = this.props.cols;
    let cells = this.state.cells;

    let grid = cells.map((cell, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          selectCell={this.selectCell}
          selectedCell={i === this.state.selectedCell}
          isNotBlocked={cell}
          cellNumberLabel={cellNumber[i]}
          handleKeyDown={this.handleKeyDown}
          handleDoubleClick={this.handleDoubleClick}
          cellId={cellId[i]}
          selectedAnswer={selectedAnswer}
        />
      );
    });
    return grid;
  };

  /* FILLS IN WORD ON GRID FROM FILLS */
  fillInWord = (fill, selectedAnswer) => {
    let cellsCopy = [...this.state.cells];
    let fillWord = Array.from(fill);
    for (let i = 0; i < selectedAnswer.length; i++) {
      cellsCopy[selectedAnswer[i]] = fillWord[i].toUpperCase();
    }

    this.setState({
      cells: cellsCopy,
    });
  };
  /* FILLS IN WORD ON GRID FROM FILLS */

  createCells = () => {
    // setting the stage
    const rows = this.props.rows;
    const cols = this.props.cols;
    const cells = this.state.cells;

    // internal variables
    let counter = 0;
    let groupAcross = [];
    let groupDown = [];

    // variables to be exported
    let cellOrientation = [];
    let cellNumber = [];
    let cellId = [];

    cells.forEach((_, i) => {
      // assigns ID to cell
      cellId.push(i);

      // figures out if cell should have a number based on block position
      let isCellBlocked = cells[i] === false;
      let isCellBeforeBlocked = cells[i - 1] === false || i % cols === 0;
      let isCellAfterBlocked = cells[i + 1] === false || (i + 1) % cols === 0;
      let isCellAboveBlocked = cells[i - cols] === false || i - cols < 0;
      let isCellBelowBlocked =
        cells[i + cols] === false || i + cols >= rows * cols;

      // helps figure out what word/clue a cell belongs to
      function findSiblings(clue, direction) {
        if (cells[clue] === false) return [];
        let arr = [clue];

        if (direction === "across") {
          for (let i = clue + 1; cells[i] !== false && i % cols !== 0; i++) {
            arr.push(i);
          }
          if (clue % cols !== 0) {
            for (
              let i = clue - 1;
              i >= 0 && cells[i] !== false && (i + 1) % cols !== 0;
              i--
            ) {
              arr.push(i);
            }
          }
        }

        if (direction === "down") {
          for (let i = clue - cols; cells[i] !== false && i >= 0; i -= cols) {
            arr.push(i);
          }
          for (
            let i = clue + cols;
            cells[i] !== false && i < rows * cols;
            i += cols
          ) {
            arr.push(i);
          }
        }

        return arr.sort();
      }

      if (isCellBlocked) {
        cellOrientation.push(null);
        cellNumber.push(null);
        return;
      }
      if (
        isCellAboveBlocked &&
        isCellBeforeBlocked &&
        !isCellAfterBlocked &&
        !isCellBelowBlocked
      ) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("acrossdown");
        groupAcross.push(findSiblings(i, "across"));
        groupDown.push(findSiblings(i, "down"));
      } else if (isCellBeforeBlocked && !isCellAfterBlocked) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("across");
        groupAcross.push(findSiblings(i, "across"));
      } else if (isCellAboveBlocked && !isCellBelowBlocked) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("down");
        groupDown.push(findSiblings(i, "down"));
      } else {
        cellOrientation.push(null);
        cellNumber.push(null);
      }
    });

    this.setState({
      cellOrientation,
      cellNumber,
      cellId,
      groupAcross,
      groupDown,
    });
  };

  render() {
    const rows = this.props.rows;
    const cols = this.props.cols;
    const user = this.context.currentUser;
    const freeze = this.state.freezeBlocks;
    const width = cols * 33;
    const height = rows * 33;

    return user ? (
      <div>
        <header>
          <h1>{this.props.puzzleTitle}</h1>
          <p>by {this.context.currentUser}</p>
        </header>

        <main>
          <div className="puzzle-options">
            <div className="block-options">
              {!freeze ? (
                <div className="pattern-btn">
                  <button type="button" onClick={() => this.handlePatternBtn()}>
                    Pattern
                  </button>
                </div>
              ) : (
                ""
              )}
              {!freeze ? (
                <div className="clear-grid-btn">
                  <button type="button" onClick={() => this.handleClearGrid()}>
                    Clear Grid
                  </button>
                </div>
              ) : (
                ""
              )}

              <div className="freeze-btn">
                {!freeze ? (
                  <button
                    type="button"
                    onClick={() => this.handleFreezeBlocks()}
                  >
                    Freeze Blocks
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            {freeze ? (
              <div>
                <button type="button" onClick={() => this.handleClearLetters()}>
                  Clear Letters
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="grid-and-fills">
            <div className="crossword__container--grid-wrapper">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMinYMin slice"
                className={`Grid ${
                  rows >= cols ? "view_box--tall" : "view_box--wide"
                }`}
                id="grid"
              >
                {this.renderGrid()}
              </svg>
            </div>
            {freeze ? (
              <Fills
                fills={this.state.fills}
                // word={word}
                fillInWord={this.fillInWord}
                // selectedAnswer={selectedAnswer}
              />
            ) : (
              ""
            )}
          </div>

          <div className="clue__container">
            {freeze ? (
              <Clues
                cellOrientation={this.state.cellOrientation}
                cellNumber={this.state.cellNumber}
                selectCell={this.selectCell}
                handleDoubleClick={(direction) =>
                  this.handleDoubleClick(direction)
                }
                cellId={this.state.cellId}
              />
            ) : (
              ""
            )}
          </div>
        </main>
      </div>
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
