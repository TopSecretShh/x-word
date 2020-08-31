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
    let blocks = this.props.blocks
    
    let grid = blocks.map((block, i) => {
      return <Cell
              key={i}
              cellSize={size}
              row={Math.floor(i / cols)}
              col={i % cols}
              cellNumber={i}
              selectCell={this.props.selectCell}
              inputCell={this.props.inputCell}
              selectedCell={i === this.props.selectedCell}
              blocked={block === true}
              cellCharacterLabel={block}
              cellNumberLabel={this.props.cellNumber[i]}
            />
    })
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
