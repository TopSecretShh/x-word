import React from "react";
import generatePattern from "../../Context/Patterns";
import "./Controls.css";

export default class Controls extends React.Component {
  handlePatternBtn = () => {
    const pattern = generatePattern(this.props.rows, this.props.cols);
    if (!this.props.freeze) {
      this.props.handleControlsInput("blocks", pattern);
    }
  };

  handleClearGrid = () => {
    const arr = Array(this.props.rows * this.props.cols).fill(true);
    if (!this.props.freeze) {
      this.props.handleControlsInput("blocks", arr);
    }
  };

  handleFreezeBlocks = () => {
    this.props.handleControlsInput("freezeBlocks", true);
    this.props.createCells();
  };

  handleClearLetters = () => {
    let grid = this.props.letters;
    let emptyGrid = grid.map((cell) => (cell = ""));
    this.props.handleControlsInput("letters", emptyGrid);
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
