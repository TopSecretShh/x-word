import React from "react";
import { Redirect } from "react-router-dom";
import Context from "./Context";
import Cell from "./Cell";
import Clues from "./Clues";

export default class PuzzleEditor extends React.Component {
  static contextType = Context;

  state = {
    rows: 15,
    cols: 15,
    title: "Untitled",
    custom: false,
    blocks: Array(225).fill(false),
    selectedCell: null,
    orientationIsHorizontal: true,
  };

  renderGrid = (cellNumber) => {
    let cols = this.context.cols;
    let blocks = this.context.blocks;

    let grid = blocks.map((block, i) => {
      return (
        <Cell
          key={i}
          cellSize={33}
          row={Math.floor(i / cols)}
          col={i % cols}
          cellNumber={i}
          selectedCell={i === this.context.selectedCell}
          blocked={block === true}
          cellCharacterLabel={block}
          cellNumberLabel={cellNumber[i]}
        />
      );
    });
    return grid;
  };

  render() {
    const user = this.context.currentUser;

    const rows = this.context.rows;
    const cols = this.context.cols;
    const width = cols * 33;
    const height = rows * 33;
    const custom = this.context.custom;

    const blocks = this.context.blocks;
    let counter = 0;
    let cellOrientation = [];
    let cellNumber = [];

    blocks.forEach((_, i) => {
      let isBlockFilled = blocks[i] === true;

      let isBlockBeforeFilled = blocks[i - 1] === true || i % cols === 0;

      let isBlockAfterFilled = blocks[i + 1] === true || (i + 1) % cols === 0;

      let isBlockAboveFilled = blocks[i - cols] === true || i - cols < 0;

      let isBlockBelowFilled =
        blocks[i + cols] === true || i + cols >= rows * cols;

      if (isBlockFilled) {
        cellOrientation.push(null);
        cellNumber.push(null);
        return;
      }
      if (
        isBlockAboveFilled &&
        isBlockBeforeFilled &&
        !isBlockAfterFilled &&
        !isBlockBelowFilled
      ) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("acrossdown"); // This should add down and across, not 'acrossdown'
      } else if (isBlockBeforeFilled && !isBlockAfterFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("across");
      } else if (isBlockAboveFilled && !isBlockBelowFilled) {
        counter++;
        cellNumber.push(counter);
        cellOrientation.push("down");
      } else {
        cellOrientation.push(null);
        cellNumber.push(null);
      }
    });

    return user ? (
      <div>
        <header>
          <h1>{this.context.title}</h1>
          <p>by {this.context.currentUser}</p>
        </header>

        <main>
          <div className="puzzle-options">
            <div className="size-btns">
              <h3>Size</h3>
              <button
                type="button"
                value="daily"
                onClick={(e) => this.context.setSize(e.target.value)}
              >
                Daily
              </button>
              <button
                type="button"
                value="sunday"
                onClick={(e) => this.context.setSize(e.target.value)}
              >
                Sunday
              </button>
              <button
                type="button"
                value="custom"
                onClick={(e) => this.context.setSize(e.target.value)}
              >
                Custom
              </button>
              {custom ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.context.handleSubmitCustom(e);
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
              <h3>Pattern</h3>
              <button
                type="button"
                onClick={() => this.context.handlePatternBtn()}
              >
                Pattern
              </button>
            </div>
          </div>

          <div className="crossword__container--grid-wrapper">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="xMinYMin slice"
              className={`Grid ${
                rows >= cols ? "view_box--tall" : "view_box--wide"
              }`}
              id="grid"
            >
              {this.renderGrid(cellNumber)}
            </svg>
          </div>

          <div>
            <Clues cellOrientation={cellOrientation} cellNumber={cellNumber} />
          </div>
        </main>
      </div>
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
