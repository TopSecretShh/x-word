import React from "react";
import Grid from "./Grid";
import Context from "./Context";
import "./App.css";

export default class App extends React.Component {
  static contextType = Context;

  state = {
    rows: 15,
    cols: 15,
    title: "Untitled",
    author: "Anonymous",
    grid: [],
  };

  setSize = (value) => {
    if (value === "daily") {
      this.setState({
        rows: 15,
        cols: 15,
      });
      this.setGrid(15, 15);
    } else if (value === "sunday") {
      this.setState({
        rows: 21,
        cols: 21,
      });
      this.setGrid(21, 21);
    } else if (value === "test") {
      this.setState({
        rows: 4,
        cols: 4,
      });
      this.setGrid(4, 4);
    }
  };

  setGrid = (x, y) => {
    let rows = x;
    let cols = y;

    let grid = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        grid.push([r, c]);
      }
    }

    this.setState({
      grid: grid,
    });
  };

  // need a mouse handler so that you can click/select squares

  render() {
    const value = {
      rows: this.state.rows,
      cols: this.state.cols,
      title: this.state.title,
      author: this.state.author,
    };
    return (
      <Context.Provider value={value}>
        <div className="App">
          <h1>{this.state.title}</h1>
          <p>by {this.state.author}</p>

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
              value="test"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Test
            </button>
          </div>

          <Grid />
        </div>
      </Context.Provider>
    );
  }
}
