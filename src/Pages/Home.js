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
        <main>
          <div>
            <h2>Welcome back, {this.context.currentUser}!</h2>
            <h3>Saved Puzzles</h3>
            <ul>
              {userPuzzles.map((p, i) => (
                <li key={i}>
                  <Link
                    to={{
                      pathname: "/puzzle-editor",
                      state: {
                        id: p.id,
                        title: p.title,
                        freeze: true,
                        rows: p.rows,
                        cols: p.cols,
                        blocks: p.blocks,
                        letters: p.letters,
                        clues_across: p.clues_across,
                        clues_down: p.clues_down,
                        new_puzzle: false,
                        cell_id: p.cell_id,
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
                  this.props.history.push("/puzzle-editor");
                  this.props.createCellIds();
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
                      placeholder="3"
                      value={this.props.rows}
                      onChange={(e) => this.props.updateRows(e.target.value)}
                      required
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
                      placeholder="3"
                      value={this.props.cols}
                      onChange={(e) => this.props.updateCols(e.target.value)}
                      required
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

                <button type="submit">Begin</button>
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
