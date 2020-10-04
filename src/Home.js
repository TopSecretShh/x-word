import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";

export default class Home extends React.Component {
  static contextType = Context;

  state = {
    puzzleDimensions: false,
  };

  createNewPuzzle = () => {
    if (!this.state.puzzleDimensions) {
      this.setState({
        puzzleDimensions: true,
      });
    }
  };

  render() {
    const puzzleDimensions = this.state.puzzleDimensions;
    return (
      <div className="Home">
        <nav>
          {/* this is just for dev nav purposes */}
          <Link className="btn-alt" to="/">
            Back to Landing
          </Link>
          <button
            type="button"
            onClick={() => {
              this.context.signOut();
              this.props.history.push("/");
            }}
          >
            Sign Out
          </button>
        </nav>

        <main>
          <div>
            <h2>Welcome back, {this.context.currentUser}!</h2>
            <h3>Saved Puzzles</h3>
            <ul>
              <li>Puzzle 1</li>
              <li>Puzzle 2</li>
              <li>Puzzle 3</li>
            </ul>
            <h3>Create New Puzzle</h3>
            <button type="button" onClick={() => this.createNewPuzzle()}>
              Create New
            </button>
          </div>
          <div>
            {puzzleDimensions ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <fieldset className="puzzle-dimensions">
                  <legend>Choose puzzle dimensions</legend>
                  <button
                    type="button"
                    onClick={() => this.props.setDailySize()}
                  >
                    Daily (15 x 15)
                  </button>
                  <button
                    type="button"
                    onClick={() => this.props.setSundaySize()}
                  >
                    Sunday (21 x 21)
                  </button>
                  <br />
                  <label>
                    # of rows:{"  "}
                    <input
                      type="number"
                      name="rows"
                      min={3}
                      max={25}
                      value={this.props.rows}
                      onChange={(e) => this.props.updateRows(e.target.value)}
                    />
                  </label>
                  <br />
                  <label>
                    # of columns:{" "}
                    <input
                      type="number"
                      name="cols"
                      min={3}
                      max={25}
                      value={this.props.cols}
                      onChange={(e) => this.props.updateCols(e.target.value)}
                    />
                  </label>
                  <br />
                  <Link to="/puzzle-editor">Begin</Link>
                </fieldset>
              </form>
            ) : (
              ""
            )}
          </div>
        </main>
      </div>
    );
  }
}
