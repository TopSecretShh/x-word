import React from "react";
import { Link } from "react-router-dom";
import PuzzleEditor from "../components/PuzzleEditor";

export default class Home extends React.Component {
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
          <div className="puzzle">
            <PuzzleEditor />
          </div>
        </main>
      </div>
    );
  }
}
