import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";

import Grid from "./Grid";
import Clues from "./Clues";

import "./App.css";

export default class Home extends React.Component {
  static contextType = Context;

  render() {
    const custom = this.context.custom;

    let rows = this.context.rows;
    let cols = this.context.cols;
    let blocks = this.context.blocks;
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

    return (
      <div className="Home">
        <nav>
          <Link className="btn-alt" to="/">
            Back to Landing
          </Link>
        </nav>
        <header>
          <h1>{this.context.title}</h1>
          <p>by {this.context.author}</p>
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

          <div className="puzzle">
            <Grid
              selectedCell={this.context.selectedCell}
              selectCell={(cell) => this.context.selectCell(cell)}
              blocks={this.context.blocks}
              cellNumber={cellNumber}
              inputCell={(cell) => this.context.handleKeydown(cell)}
            />
            <Clues cellOrientation={cellOrientation} cellNumber={cellNumber} />
          </div>
        </main>
      </div>
    );
  }
}
