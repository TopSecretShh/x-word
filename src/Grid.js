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
    let cols = this.context.cols;
    let blocks = this.props.blocks;

    let grid = blocks.map((block, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          cellNumber={i}
          selectCell={this.props.selectCell}
          changeOrientation={this.props.changeOrientation}
          inputCell={this.props.inputCell}
          selectedCell={i === this.props.selectedCell}
          blocked={block === true}
          cellCharacterLabel={block}
          cellNumberLabel={this.props.cellNumber[i]}
        />
      );
    });
    return grid;
  };

  setGridArray = (grid) => {
    // console.log(grid[0].props.children[0]);
  };

  // numbering
  // count = 1
  // box gets number if:
  //    - first in row
  //    - block to the left
  //    - block above
  // box does not get number if:
  //    - not first in row
  //    - no block above
  //    - no block to left
  //    - box is block

  // so first, get all boxes (how?)
  // I guess all td values could be put into state?
  // something like:
  // state = {
  //   squares: [
  //     {1: ''},
  //     {2: ''}
  //   ]
  // }

  render() {
    let width = this.context.cols * 33;
    let height = this.context.rows * 33;
    return (
      <div className="crossword__container--grid-wrapper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMinYMin slice"
          className="Grid"
          id="grid"
        >
          {this.renderGrid()}
        </svg>
      </div>
    );
  }
}
