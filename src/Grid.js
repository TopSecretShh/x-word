import React from "react";
import Context from "./Context";
import Cell from "./Cell";

export default class Grid extends React.Component {
  // static contextType = Context;

  // daily puzzle size = 15 x 15
  // sunday puzzle size = 21 x 21
  // black squares = blocks
  // daily: max 78 words/42 blocks
  // must be symmetrical
  // cannot have closed sections
  // three letter minimum
  // all letters should be in an across and down word

  renderGrid = () => {
    let {blocks, cols, highlightedCells} = this.props


    let grid = blocks.map((block, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          cellNumber={i}
          selectCell={this.props.selectCell}
          selectAnswer={this.props.selectAnswer}
          changeOrientation={this.props.changeOrientation}
          inputCell={this.props.inputCell}
          selectedCell={i === this.props.selectedCell}
          selectedAnswer={this.props.selectedAnswer.includes(i)}
          blocked={block === true}
          cellCharacterLabel={block}
          cellNumberLabel={this.props.cellNumber[i]}
          highlightedCells={highlightedCells}
          cells={this.props.cells[i]}
        />
      );
    });
    return grid;
  };

  render() {
    // let rows = this.context.rows 
    // let cols = this.context.cols
    let rows = this.props.rows
    let cols = this.props.cols
    let width = cols * 33;
    let height = rows * 33;
    return (
      <div className="crossword__container--grid-wrapper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMinYMin slice"
          className={`Grid ${rows > cols ?
             'view_box--tall' : 'view_box--wide'}`}
          id="grid"
        >
          {this.renderGrid()}
        </svg>
      </div>
    );
  }
}
