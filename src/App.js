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
  };

  setSizeDaily = () => {
    this.setState({
      rows: 15,
      cols: 15,
    });
  };

  setSizeSunday = () => {
    this.setState({
      rows: 21,
      cols: 21,
    });
  };

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
            <button type="button" onClick={() => this.setSizeDaily()}>
              Daily
            </button>
            <button type="button" onClick={() => this.setSizeSunday()}>
              Sunday
            </button>
          </div>

          <Grid />
        </div>
      </Context.Provider>
    );
  }
}
