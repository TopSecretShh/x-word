import React from "react";
import { Redirect } from "react-router-dom";
import Context from "../Context/Context";
import Controls from "../Components/Controls/Controls";
import Grid from "../Components/Grid/Grid";
import Fills from "../Components/Fills/Fills";
import Clues from "../Components/Clues/Clues";
import BlockStats from "../Components/Stats/BlockStats";
import ClueStats from "../Components/Stats/ClueStats";

export default class PuzzleEditor extends React.Component {
  static contextType = Context;

  state = {
    title: this.props.puzzleTitle,
    rows: this.props.rows,
    cols: this.props.cols,
    cells: Array(this.props.rows * this.props.cols).fill(true),
    selectedCell: null,
    orientationIsHorizontal: true,
    freezeBlocks: false,
    fills: [],
    cellId: this.props.cellId,

    cellOrientation: [],
    cellNumber: [],

    groupAcross: [],
    groupDown: [],

    selectedAnswer: [],
    word: "",

    new_puzzle: true,

    puzzle_id: "",
    clues_across: [],
    clues_down: [],

    edit_title: false,
  };

  componentDidMount() {
    const savedPuzzle = this.props.location.state;
    if (savedPuzzle !== undefined) {
      this.setState(
        {
          new_puzzle: false,
          puzzle_id: savedPuzzle.id,
          title: savedPuzzle.title,
          freezeBlocks: true,
          rows: savedPuzzle.rows,
          cols: savedPuzzle.cols,
          cells: savedPuzzle.cells,
          cellId: savedPuzzle.cellId,
          clues_across: savedPuzzle.clues_across,
          clues_down: savedPuzzle.clues_down,
        },
        () => {
          this.createCells();
        }
      );
    }
  }

  handleControlsInput = (field, value) => {
    if (typeof field === "object") {
      this.setState({ field });
    } else {
      this.setState({
        [field]: value,
      });
    }
  };

  handleSavePuzzle = (cluesAcross, cluesDown) => {
    const { puzzle_id, title, rows, cols, cells, cellId } = this.state;
    const { currentUser, userPuzzles } = this.context;
    const id = puzzle_id !== "" ? puzzle_id : userPuzzles.length + 1;
    const puzzle = {
      id: id,
      username: currentUser,
      title: title,
      rows: rows,
      cols: cols,
      cells: cells,
      cellId: cellId,
      clues_across: cluesAcross,
      clues_down: cluesDown,
    };
    this.props.updateUserPuzzles(puzzle);
  };

  selectCell = (value) => {
    this.setState(
      {
        selectedCell: value,
      },
      () => {
        this.createWord();
      }
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

    this.setState({
      selectedAnswer,
      word,
    });

    this.searchWord(word);
  };

  searchWord = (word) => {
    fetch(`https://api.datamuse.com/words?sp=${word}`)
      .then((response) => response.json())
      .then((data) => {
        let words = data.map((word) => (word.score > 100 ? word.word : ""));
        words = words.filter(
          (w) => w.replace(/\s+/g, "").length === word.length
        );

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
        ((cell + 1) / this.state.cols) % 2 === 0 ||
        ((cell + 1) / this.state.cols) % 2 === 1
      ) {
        console.log("right edge");
        return cell;
      } else {
        nextCell = cell + 1;
        return nextCell;
      }
    } else {
      if (cell < this.state.cols * this.state.rows - this.state.cols) {
        nextCell = cell + this.state.cols;
        return nextCell;
      } else {
        return cell;
      }
    }
  };

  fillCell = (cell, character) => {
    const { rows, cols } = this.state;
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
    if (e.key.match(/\s/g)) {
      if (this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: false,
        });
        this.selectCell(cell);
      } else if (!this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: true,
        });
        this.selectCell(cell);
      }
    }
    if (e.key === "ArrowRight") {
      if (
        ((cell + 1) / this.state.cols) % 2 === 0 ||
        ((cell + 1) / this.state.cols) % 2 === 1
      ) {
        console.log("right edge");
      } else {
        this.selectCell(cell + 1);
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
        this.selectCell(cell - 1);
      }
    }
    if (e.key === "ArrowUp") {
      if (cell > this.state.cols - 1) {
        this.selectCell(cell - this.state.cols);
      }
    }
    if (e.key === "ArrowDown") {
      if (cell < this.state.cols * this.state.rows - this.state.cols) {
        this.selectCell(cell + this.state.cols);
      }
    }
    if (e.key === "Backspace") {
      if (this.state.orientationIsHorizontal) {
        if (typeof this.state.cells[cell] === "string") {
          this.deleteCellContent(cell, true);
        }
        if (
          cell === 0 ||
          (cell / this.state.cols) % 2 === 0 ||
          (cell / this.state.cols) % 2 === 1
        ) {
          this.selectCell(cell);
        } else {
          this.selectCell(cell - 1);
        }
      } else {
        if (typeof this.state.cells[cell] === "string") {
          this.deleteCellContent(cell, true);
        }
        if (cell > this.state.cols - 1) {
          this.selectCell(cell - this.state.cols);
        } else {
          this.selectCell(cell);
        }
      }
    }
    e.preventDefault();
  };

  fillInWord = (fill) => {
    let cellsCopy = [...this.state.cells];
    let fillWord = Array.from(fill.replace(/\s+/g, ""));
    for (let i = 0; i < this.state.selectedAnswer.length; i++) {
      cellsCopy[this.state.selectedAnswer[i]] = fillWord[i].toUpperCase();
    }

    this.setState({
      cells: cellsCopy,
    });
  };

  createCells = () => {
    // setting the stage
    const rows = this.state.rows;
    const cols = this.state.cols;
    const cells = this.state.cells;

    // internal variables
    let counter = 0;
    let groupAcross = [];
    let groupDown = [];

    // variables to be exported
    let cellOrientation = [];
    let cellNumber = [];

    cells.forEach((_, i) => {
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
      groupAcross,
      groupDown,
    });
  };

  toggleEditTitle = () => {
    this.setState({
      edit_title: !this.state.edit_title,
    });
  };

  updatePuzzleTitle = (new_title) => {
    this.setState({
      title: new_title,
    });
  };

  render() {
    const user = this.context.currentUser;
    const rows = this.state.rows;
    const cols = this.state.cols;
    const freeze = this.state.freezeBlocks;
    const title = this.state.title;
    const cells = this.state.cells;
    const new_puzzle = this.state.new_puzzle;
    const savedCluesAcross = this.state.clues_across;
    const savedCluesDown = this.state.clues_down;

    const edit_title = this.state.edit_title;

    return user ? (
      <div>
        <header>
          <div className="flex-container">
            {!edit_title ? (
              <>
                <h1>{title}</h1>
                <button type="button" onClick={() => this.toggleEditTitle()}>
                  Edit Title
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => this.updatePuzzleTitle(e.target.value)}
                />
                <button type="button" onClick={() => this.toggleEditTitle()}>
                  Ok
                </button>
              </>
            )}
          </div>

          <p>by {this.context.currentUser}</p>
        </header>

        <main>
          <Controls
            handleControlsInput={this.handleControlsInput}
            freeze={freeze}
            rows={rows}
            cols={cols}
            cells={cells}
            createCells={this.createCells}
          />

          <div className="grid-and-fills">
            <Grid
              width={cols * 33}
              height={rows * 33}
              cellNumber={this.state.cellNumber}
              cellId={this.state.cellId}
              selectedAnswer={this.state.selectedAnswer}
              rows={rows}
              cols={cols}
              cells={cells}
              selectedCell={this.state.selectedCell}
              selectCell={this.selectCell}
              handleKeyDown={this.handleKeyDown}
              handleDoubleClick={this.handleDoubleClick}
            />

            <div>
              {freeze ? (
                <Fills fillInWord={this.fillInWord} fills={this.state.fills} />
              ) : (
                ""
              )}

              <div className="stats">
                {!freeze ? (
                  <BlockStats cells={cells} />
                ) : (
                  <ClueStats cellOrientation={this.state.cellOrientation} />
                )}
              </div>
            </div>
          </div>

          <div className="clue__container">
            {freeze && this.state.cellOrientation.length ? (
              <Clues
                cellOrientation={this.state.cellOrientation}
                cellNumber={this.state.cellNumber}
                selectCell={this.selectCell}
                handleDoubleClick={(direction) =>
                  this.handleDoubleClick(direction)
                }
                cellId={this.state.cellId}
                new_puzzle={new_puzzle}
                savedCluesAcross={savedCluesAcross}
                savedCluesDown={savedCluesDown}
                handleSavePuzzle={this.handleSavePuzzle}
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
