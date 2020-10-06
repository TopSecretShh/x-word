import React from "react";
import { Redirect } from "react-router-dom";
import Context from "./Context";

import Controls from "./Controls/Controls"
import Grid from "./Grid/Grid"

export default class PuzzleEditor extends React.Component {
  static contextType = Context;

  state = {
    rows: 3,
    cols: 3,
    title: "Untitled",
    custom: false,
    cells: Array(9).fill(true),
    selectedCell: null,
    orientationIsHorizontal: true,
    freezeBlocks: false,
    fills: [],
  };
  

  handleControlsInput = (field, value) => {
    if (typeof field === 'object') {
      this.setState(field)
    } else {
    this.setState({
      [field]: value
    })
    }
  }
  
  selectCell = (value) => {
    this.setState({
      selectedCell: value
    })
  }

  // TODO this lags behind because they aren't synchronous...
  // TODO need to fix a/synchrony issue!
  // the issue might arise from the fact that 'word' is created/updated in the render of the component?
  // passing in word, which comes from previously selected cell, not the newly selected one...
  // word needs to be selected in a different way
  // word comes from selectedAnswer in createCells. selectedAnswer comes from this.state.selectedCell

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

  fillCell = (cell, character, word) => {
    const { rows, cols, orientationIsHorizontal } = this.state;
    const totalSquares = rows * cols - 1;
    const cellTwinNumber = totalSquares - cell;
    const nextCell = this.findNextCell(cell, orientationIsHorizontal);

    if (character) {
      character = character.toUpperCase();
      this.selectCell(nextCell, word);
    }

    this.updateCell(cell, character, cellTwinNumber);
  };

  handleKeydown = (e, word) => {
    const cell = this.state.selectedCell;

    if (e.key === "." && (cell || cell === 0) && !this.state.freezeBlocks) {
      this.fillCell(cell);
    }
    if (e.key.match(/^[a-z]+$/)) {
      this.fillCell(cell, e.key, word);
    }
    // TODO need to find a way for changing the orientation to reselect the cell (and therefore highlight the correct word, across/down)
    // should use selectCell fn?
    if (e.key.match(/\s/g)) {
      if (this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: false,
        });
        // TODO not sure if this addresses the problem, still non-synchronous
        this.selectCell(cell, word);
      } else if (!this.state.orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: true,
        });
        // TODO not sure if this addresses the problem, still non-synchronous
        this.selectCell(cell, word);
      }
    }
    if (e.key === "ArrowRight") {
      if (
        ((cell + 1) / this.state.cols) % 2 === 0 ||
        ((cell + 1) / this.state.cols) % 2 === 1
      ) {
        console.log("right edge");
      } else {
        this.selectCell(cell + 1, word);
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
        this.selectCell(cell - 1, word);
      }
    }
    if (e.key === "ArrowUp") {
      if (cell > this.state.cols - 1) {
        this.selectCell(cell - this.state.cols, word);
      }
    }
    if (e.key === "ArrowDown") {
      if (cell < this.state.cols * this.state.rows - this.state.cols) {
        this.selectCell(cell + this.state.cols, word);
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
          this.selectCell(cell, word);
        } else {
          this.selectCell(cell - 1, word);
        }
      } else {
        if (typeof this.state.cells[cell] === "string") {
          this.deleteCellContent(cell, true);
        }
        if (cell > this.state.cols - 1) {
          this.selectCell(cell - this.state.cols, word);
        } else {
          this.selectCell(cell, word);
        }
      }
    }
    e.preventDefault();
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

  render() {
    const {rows, cols, cells, custom, freezeBlocks} = this.state
    const user = this.context.currentUser;

    return user ? (
      <>
        <header>
          <h1>{this.context.title}</h1>
          <p>by {this.context.currentUser}</p>
        </header>
        {/* <main> */}
          <Controls 
            handleControlsInput={this.handleControlsInput}
            freezeBlocks={freezeBlocks}
            rows={rows}
            cols={cols}
            cells={cells}
            custom={custom}
          />
          <Grid 
            rows={this.state.rows}
            cols={this.state.cols}
            cells={this.state.cells}
            orientationIsHorizontal={this.state.orientationIsHorizontal}
            selectedCell={this.state.selectedCell}
            fills={this.state.fills}
            selectCell={this.selectCell}
            handleKeydown={this.handleKeydown}
            handleDoubleClick={this.handleDoubleClick}
            fillInWord={this.fillInWord}
          />
        {/* </main> */}
      </>
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
