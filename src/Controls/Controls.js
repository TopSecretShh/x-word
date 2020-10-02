import React from "react";
import generatePattern from "../Patterns"

function Controls({handleControlsInput, freezeBlocks, rows, cols, cells, custom}) {

  function handleClearLetters() {
    let grid = cells;
    let emptyGrid = grid.map((cell) =>
      typeof cell === "string" ? (cell = true) : cell
    );
    handleControlsInput('cells', emptyGrid)
  };
    
  function handleClearGrid() {
    let arr = Array(rows * cols).fill(true)
    if (!freezeBlocks) {
        handleControlsInput('cells', arr)
    }
    // TODO there should be an else statement here that shows the user a message to let them know that they cannot clear grid while freeze is enabled
  };

  function handlePatternBtn() {
    const pattern = generatePattern(rows, cols);
    if (!freezeBlocks) {
        handleControlsInput('cells', pattern)
    }
  };

  function setSize(value) {
    if (value === "daily") {
      handleControlsInput({
        rows: 15,
        cols: 15,
        cells: Array(225).fill(true),
        selectedCell: null,
        freezeBlocks: false,
      });
    } else if (value === "sunday") {
      handleControlsInput({
        rows: 21,
        cols: 21,
        cells: Array(441).fill(true),
        selectedCell: null,
        freezeBlocks: false,
      });
    } else if (value === "custom") {
      handleControlsInput({
        custom: true,
      });
    }
    if (custom) {
      handleControlsInput({
        custom: false,
      });
    }
  };

  function handleSubmitCustom(e) {
    handleControlsInput({
      rows: parseInt(e.target.rows.value),
      cols: parseInt(e.target.cols.value),
      cells: Array(e.target.rows.value * e.target.cols.value).fill(true),
      selectedCell: null,
      freezeBlocks: false,
    });
  };

  return (
    <div className="puzzle-options">

      <div className="size-btns">
        <h3>Grid Size</h3>
        <button
          type="button"
          value="daily"
          onClick={(e) => setSize(e.target.value)}
        >
          Daily (15x15)
        </button>
        <button
          type="button"
          value="sunday"
          onClick={(e) => setSize(e.target.value)}
        >
          Sunday (21x21)
        </button>
        <button
          type="button"
          value="custom"
          onClick={(e) => setSize(e.target.value)}
        >
          Custom
        </button>
            
            {custom ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitCustom(e);
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
      <button type="button" onClick={() => handlePatternBtn()}>
        Generate
      </button>
    </div>

    <div className="freeze-btn">
      <h3>Toggle Block Freeze</h3>
      {/* TODO this could be a sweet animated lock icon that transitions between un/locked */}
      <button type="button" onClick={() => handleControlsInput('freezeBlocks', !freezeBlocks)}>
          {freezeBlocks ? 'Unfreeze' : 'Freeze'}
      </button>
    </div>

    <div className="clear-grid-btns">
      <h3>Clear</h3>
      <button type="button" onClick={() => handleClearLetters()}>
        Clear Letters
      </button>
      <button type="button" onClick={() => handleClearGrid()}>
        Clear Grid
      </button>
    </div>
  </div>
  )
}

export default Controls