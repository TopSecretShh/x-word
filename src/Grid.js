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

  render() {
    return (
      <div className="Grid">
        <table id="grid">
          <tr data-row="0">
            <td data-col="0">
              <div className="label">1</div>
              <div className="fill"> </div>
            </td>
            <td data-col="1">
              <div className="label">2</div>
              <div className="fill"> </div>
            </td>
            <td data-col="2">
              <div className="label">3</div>
              <div className="fill"> </div>
            </td>
            <td data-col="3">
              <div className="label">4</div>
              <div className="fill"> </div>
            </td>
          </tr>
          <tr data-row="1">
            <td data-col="0">
              <div className="label">5</div>
              <div className="fill"> </div>
            </td>
            <td data-col="1"></td>
            <td data-col="2"></td>
            <td data-col="3"></td>
          </tr>
          <tr data-row="2">
            <td data-col="0">
              <div className="label">6</div>
              <div className="fill"> </div>
            </td>
            <td data-col="1"></td>
            <td data-col="2"></td>
            <td data-col="3"></td>
          </tr>
          <tr data-row="3">
            <td data-col="0">
              <div className="label">7</div>
              <div className="fill"> </div>
            </td>
            <td data-col="1"></td>
            <td data-col="2"></td>
            <td data-col="3"></td>
          </tr>
        </table>
      </div>
    );
  }
}
