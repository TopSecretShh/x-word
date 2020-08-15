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
          <Grid />
        </div>
      </Context.Provider>
    );
  }
}
