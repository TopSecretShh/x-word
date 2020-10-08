import React from "react";
import Cell from "../Cell/Cell";

export default class Grid extends React.Component {
  renderGrid = () => {
    const cellNumber = this.props.cellNumber;
    const cellId = this.props.cellId;
    const selectedAnswer = this.props.selectedAnswer;
    const cols = this.props.cols;
    const cells = this.props.cells;

    const grid = cells.map((cell, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          selectCell={this.props.selectCell}
          selectedCell={i === this.props.selectedCell}
          isNotBlocked={cell}
          cellNumberLabel={cellNumber[i]}
          handleKeyDown={this.props.handleKeyDown}
          handleDoubleClick={this.props.handleDoubleClick}
          cellId={cellId[i]}
          selectedAnswer={selectedAnswer}
        />
      );
    });
    return grid;
  };

  render() {
    return this.renderGrid();
  }
}
