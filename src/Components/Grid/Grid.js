import React from "react";
import Cell from "../Cell/Cell";

export default class Grid extends React.Component {
  renderGrid = () => {
    const cellNumber = this.props.cellNumber;
    const cell_id = this.props.cell_id;
    const selectedAnswer = this.props.selectedAnswer;
    const cols = this.props.cols;
    const blocks = this.props.blocks;
    const letters = this.props.letters;

    const grid = blocks.map((block, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          selectCell={this.props.selectCell}
          selectedCell={i === this.props.selectedCell}
          isNotBlocked={block}
          letter={letters[i]}
          cellNumberLabel={cellNumber[i]}
          handleKeyDown={this.props.handleKeyDown}
          handleDoubleClick={this.props.handleDoubleClick}
          cell_id={cell_id[i]}
          selectedAnswer={selectedAnswer}
        />
      );
    });
    return grid;
  };

  render() {
    const rows = this.props.rows;
    const cols = this.props.cols;
    const width = cols * 33;
    const height = rows * 33;

    return (
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
    );
  }
}
