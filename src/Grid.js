import React from "react";

export default class Grid extends React.Component {
  // daily puzzle size = 15 x 15
  // sunday puzzle size = 21 x 21
  // black squares = blocks
  // daily: max 78 words/42 blocks
  // must be symmetrical
  // cannot have closed sections
  // three letter minimum
  // all letters should be in an across and down word

  render() {
    return (
      <div className="Grid">
        <table id="grid">
          <tr data-row="0">
            <td data-col="0"></td>
            <td data-col="1"></td>
            <td data-col="2"></td>
            <td data-col="3"></td>
          </tr>
          <tr data-row="1">
            <td data-col="0"></td>
            <td data-col="1"></td>
            <td data-col="2"></td>
            <td data-col="3"></td>
          </tr>
          <tr data-row="2">
            <td data-col="0"></td>
            <td data-col="1"></td>
            <td data-col="2"></td>
            <td data-col="3"></td>
          </tr>
          <tr data-row="3">
            <td data-col="0"></td>
            <td data-col="1"></td>
            <td data-col="2"></td>
            <td data-col="3"></td>
          </tr>
        </table>
      </div>
    );
  }
}
