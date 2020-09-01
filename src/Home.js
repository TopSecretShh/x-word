import React from "react";
import Context from "./Context";

export default class Home extends React.Component {
  static contextType = Context;

  state = {
    rows: 6,
    cols: 3,
    title: "Untitled",
    author: "Anonymous",
    custom: false,
    blocks: Array(18).fill(false),
    selectedCell: null,
    orientationIsHorizontal: true,
  };

  setSize = (value) => {
    if (value === "daily") {
      this.setState({
        rows: 15,
        cols: 15,
        blocks: Array(225).fill(false),
        selectedCell: null,
      });
    } else if (value === "sunday") {
      this.setState({
        rows: 21,
        cols: 21,
        blocks: Array(441).fill(false),
        selectedCell: null,
      });
    } else if (value === "custom") {
      this.setState({
        custom: true,
      });
    }
    if (this.state.custom) {
      this.setState({
        custom: false,
      });
    }
  };

  render() {
    const custom = this.state.custom;
    return (
      <div className="Home">
        <h1>{this.context.title}</h1>
        <p>by {this.context.author}</p>

        <div className="puzzle-options">
          <div className="size-btns">
            <h3>Size</h3>
            <button
              type="button"
              value="daily"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Daily
            </button>
            <button
              type="button"
              value="sunday"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Sunday
            </button>
            <button
              type="button"
              value="custom"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Custom
            </button>
            {custom ? (
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
            <h3>Pattern</h3>
            <button type="button" onClick={() => this.handlePatternBtn()}>
              Pattern
            </button>
          </div>
        </div>
      </div>
    );
  }
}
