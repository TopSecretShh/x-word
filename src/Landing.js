import React from "react";
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <h1>X-Word</h1>
        <p>
          A crossword creator for the professional puzzle compiler, for the
          amatuer puzzle builder, for the enthusiastic puzzle solver.
        </p>
        <p>Pardon the dust, construction is ongoing.</p>
        <Link className="btn-login" to="/login">
          Login
        </Link>{" "}
        <Link className="btn-signup" to="/signup">
          Sign Up
        </Link>{" "}
        <Link className="btn-alt" to="/home">
          Skip to Home
        </Link>
      </div>
    );
  }
}
