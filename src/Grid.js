import React from "react";
import Context from "./Context";
import Cell from "./Cell";

export default class Grid extends React.Component {
  static contextType = Context;

  // daily puzzle size = 15 x 15
  // sunday puzzle size = 21 x 21
  // black squares = blocks
  // daily: max 78 words/42 blocks
  // must be symmetrical
  // cannot have closed sections
  // three letter minimum
  // all letters should be in an across and down word

  renderGrid = () => {
    let rows = this.context.rows;
    let cols = this.context.cols;
    let size = 500 / rows;
<<<<<<< HEAD
  
=======
    let blocks = this.props.blocks;
    let counter = 0;

    let cellNumberLabels = blocks.map((block, i) => {
      let isBlockFilled = block;
      let isBlockBeforeFilled = blocks[i - 1] || i % rows === 0;
      let isBlockAboveFilled = blocks[i - rows] || i - rows < 0;
      let isBlockBelowFilled = blocks[i + rows] || i + rows > rows * rows;

      // need to adjust isBlockNumbered so that if there is a block on the left edge the cell above should have a number
      // there must be something here that is limiting the numbering:
      // daily size with pattern missing last two numbers
      // sunday size w/o pattern only numbers up to a point
      let isBlockNumbered =
        !isBlockFilled &&
        !isBlockBelowFilled &&
        (isBlockBeforeFilled || isBlockAboveFilled);

      if (isBlockNumbered) {
        counter++;
        return counter;
      }
      return null;
    });

>>>>>>> 897a4dee047156e81d1fdbfa369eb8b8454ba78d
    let grid = Array.from({ length: rows }).map((_, i) => (
      <React.Fragment key={i}>
        {Array.from({ length: cols }).map((_, j) => (
          <Cell
            key={[i, j]}
            cellSize={size}
            row={i}
            col={j}
            cellNumber={rows * i + j}
            selectCell={this.props.selectCell}
            selectedCell={rows * i + j === this.props.selectedCell}
            blocked={this.props.blocks[rows * i + j]}
            cellNumberLabel={this.props.cellNumberLabels[rows * i + j][0]}
          />
        ))}
      </React.Fragment>
    ));
    return grid;
  };

  render() {
    return (
      <div className="crossword__container--grid-wrapper">
        <svg viewBox={`0 0 500 500`} className="Grid" id="grid">
          {this.renderGrid()}
        </svg>
      </div>
    );
  }
}
