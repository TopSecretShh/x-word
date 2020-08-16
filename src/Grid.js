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
      <tr key={i}>
        {Array.from({ length: cols }).map((_, i) => (
          <td key={i}>
            <div className="label"></div>
            <div className="fill"></div>
          </td>
        ))}
      </tr>
    ));

    return grid;
  };

  render() {
    return (
      <div className="Grid">
        <table id="grid">{this.renderGrid()}</table>
      </div>
    );
  }
}
