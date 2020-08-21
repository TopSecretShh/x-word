import React from "react";
import Context from "./Context";

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

    let grid = Array.from({ length: rows }).map((_, i) => (
      <tr key={i} data-row={i}>
        {Array.from({ length: cols }).map((_, i) => (
          <td key={i} data-col={i}>
            <div className="label"></div>
            <div className="fill"></div>
          </td>
        ))}
      </tr>
    ));

    this.setGridArray(grid);

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
    return (
      <div className="Grid">
        <table id="grid">
          <tbody>{this.renderGrid()}</tbody>
        </table>
      </div>
    );
  }
}
