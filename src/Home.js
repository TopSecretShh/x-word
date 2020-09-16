import React from "react";
import { Link } from "react-router-dom";
import PuzzleEditor from "./PuzzleEditor";
import Context from "./Context";

export default class Home extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className="Home">
        <nav>
          {/* this is just for dev nav purposes */}
          <Link className="btn-alt" to="/">
            Back to Landing
          </Link>
        </nav>

        <main>
          {/* TODO just playing around here */}
          <div>
            <h2>Welcome back, {this.context.currentUser}!</h2>
            <h3>Saved Puzzles</h3>
            <ul>
              <li>Puzzle 1</li>
              <li>Puzzle 2</li>
              <li>Puzzle 3</li>
            </ul>
            <h3>Create New Puzzle</h3>
            <Link to="/puzzle-editor">Create New</Link>
          </div>

          {/* <div className="puzzle">
            <PuzzleEditor />
          </div> */}
        </main>
      </div>
    );
  }
}
