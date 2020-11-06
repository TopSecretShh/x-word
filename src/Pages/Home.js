import React from "react";
import { Link, Redirect } from "react-router-dom";
import Context from "../Context/Context";

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
    const user = this.context.currentUser;

    const puzzleDimensions = this.state.puzzleDimensions;
    const userPuzzles = this.context.userPuzzles;
    return user ? (
      <div className="Home">
        <nav>
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
              {/* TODO the user puzzle links need to send all of the data/props to puzzle editor so it is set up ready to go */}
              {userPuzzles.map((p, i) => (
                <li key={i}>
                  <Link
                    to={{
                      pathname: "/puzzle-editor",
                      state: {
                        title: p.title,
                        freeze: true,
                        rows: p.rows,
                        cols: p.cols,
                        cells: p.cells,
                        clues_across: p.clues_across,
                        clues_down: p.clues_down,
                      },
                    }}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
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
                </fieldset>
                <label>
                  Puzzle Title
                  <input
                    type="text"
                    name="puzzle-title"
                    value={this.props.puzzleTitle}
                    onChange={(e) =>
                      this.props.updatePuzzleTitle(e.target.value)
                    }
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    this.props.history.push("/puzzle-editor");
                    this.props.createCellIds();
                  }}
                >
                  Begin
                </button>
              </form>
            ) : (
              ""
            )}
          </div>
        </main>
      </div>
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
