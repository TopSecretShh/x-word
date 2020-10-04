import React from "react";
import generatePattern from "../Patterns"

import "./Controls.css"


class Controls extends React.Component {
  
  handleClearLetters() {
    let grid = this.props.cells;
    let emptyGrid = grid.map((cell) =>
      typeof cell === "string" ? (cell = true) : cell
    );
    this.props.handleControlsInput('cells', emptyGrid)
  };
    
  handleClearGrid() {
    let arr = Array(this.props.rows * this.props.cols).fill(true)
    if (!this.props.freezeBlocks) {
        this.props.handleControlsInput('cells', arr)
    }
    // TODO there should be an else statement here that shows the user a message to let them know that they cannot clear grid while freeze is enabled
  };

  handlePatternBtn() {
    const pattern = generatePattern(this.props.rows, this.props.cols);
    if (!this.props.freezeBlocks) {
        this.props.handleControlsInput('cells', pattern)
    }
  };

  setSize(value) {
    if (value === "daily") {
      this.props.handleControlsInput({
        rows: 15,
        cols: 15,
        cells: Array(225).fill(true),
        selectedCell: null,
        freezeBlocks: false,
      });
    } else if (value === "sunday") {
      this.props.handleControlsInput({
        rows: 21,
        cols: 21,
        cells: Array(441).fill(true),
        selectedCell: null,
        freezeBlocks: false,
      });
    } else if (value === "custom") {
      this.props.handleControlsInput({
        custom: true,
      });
    }
    if (this.props.custom) {
      this.props.handleControlsInput({
        custom: false,
      });
    }
  };

  handleSubmitCustom(e) {
    this.props.handleControlsInput({
      rows: parseInt(e.target.rows.value),
      cols: parseInt(e.target.cols.value),
      cells: Array(e.target.rows.value * e.target.cols.value).fill(true),
      selectedCell: null,
      freezeBlocks: false,
    });
  };

  render(){
    return (
      <div className="puzzle-options">

        <div className="size-btns">
          <h3>Grid Size</h3>
          <button
            type="button"
            value="daily"
            onClick={(e) => this.setSize(e.target.value)}
          >
            Daily (15x15)
          </button>
          <button
            type="button"
            value="sunday"
            onClick={(e) => this.setSize(e.target.value)}
          >
            Sunday (21x21)
          </button>
          <button
            type="button"
            value="custom"
            onClick={(e) => this.setSize(e.target.value)}
          >
            Custom
          </button>
              
              {this.props.custom ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.handleSubmitCustom(e);
                  }}
                >
                  <fieldset className="custom-size">
                    <label>
                      # of rows:{"  "}
                      <input type="number" name="rows" min={3} max={25} />
                    </label>
                    <br />
                    <label>
                      # of columns:{" "}
                      <input type="number" name="cols" min={3} max={25} />
                    </label>
                    <br />
                    <button type="submit">Enter</button>
                  </fieldset>
                </form>
              ) : (
                ""
              )}
        </div>

      <div className="pattern-btn">
        <h3>Random Pattern</h3>
        <button type="button" onClick={() => this.handlePatternBtn()}>
          Generate
        </button>
      </div>

      <div className="freeze-btn">
        <h3>Toggle Block Freeze</h3>
        {/* TODO this could be a sweet animated lock icon that transitions between un/locked */}
        <button type="button" onClick={() => this.props.handleControlsInput('freezeBlocks', !this.props.freezeBlocks)}>
            {this.props.freezeBlocks ? 'Unfreeze' : 'Freeze'}
        </button>
      </div>

      <div className="clear-grid-btns">
        <h3>Clear</h3>
        <button type="button" onClick={() => this.handleClearLetters()}>
          Clear Letters
        </button>
        <button type="button" onClick={() => this.handleClearGrid()}>
          Clear Grid
        </button>
      </div>
    </div>
    )
  }
}

export default Controls