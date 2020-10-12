import React from "react";
import generatePattern from "../../Context/Patterns";
import "./Controls.css";

export default class name extends React.Component {
  handlePatternBtn = () => {
    const pattern = generatePattern(this.props.rows, this.props.cols);
    if (!this.props.freeze) {
      this.props.handleControlsInput("cells", pattern);
    }
  };

  handleClearGrid = () => {
    const arr = Array(this.props.rows * this.props.cols).fill(true);
    if (!this.props.freeze) {
      this.props.handleControlsInput("cells", arr);
    }
  };

  handleFreezeBlocks = () => {
    this.props.handleControlsInput("freezeBlocks", true);
    this.props.createCells();
  };

  handleClearLetters = () => {
    let grid = this.props.cells;
    let emptyGrid = grid.map((cell) =>
      typeof cell === "string" ? (cell = true) : cell
    );
    this.props.handleControlsInput("cells", emptyGrid);
  };

  render() {
    return (
      <div className="puzzle-options">
        <div className="block-options">
          {!this.props.freeze ? (
            <div className="pattern-btn">
              <button type="button" onClick={() => this.handlePatternBtn()}>
                Pattern
              </button>
            </div>
          ) : (
            ""
          )}
          {!this.props.freeze ? (
            <div className="clear-grid-btn">
              <button type="button" onClick={() => this.handleClearGrid()}>
                Clear Grid
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="freeze-btn">
            {!this.props.freeze ? (
              <button type="button" onClick={() => this.handleFreezeBlocks()}>
                Freeze Blocks
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        {this.props.freeze ? (
          <div>
            <button type="button" onClick={() => this.handleClearLetters()}>
              Clear Letters
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
