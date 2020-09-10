import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";

import PuzzleEditor from "./PuzzleEditor";
// import Clues from "./Clues";

import "./App.css";

export default class Home extends React.Component {
  static contextType = Context;

  render() {
    // let rows = this.context.rows;
    // let cols = this.context.cols;
    // let blocks = this.context.blocks;
    // let counter = 0;
    // let cellOrientation = [];
    // let cellNumber = [];

    return (
      <div className="Home">
        <nav>
          {/* this is just for dev nav purposes */}
          <Link className="btn-alt" to="/">
            Back to Landing
          </Link>
        </nav>

        <main>
          <div className="puzzle">
            <PuzzleEditor />
          </div>
        </main>
      </div>
    );
  }
}
