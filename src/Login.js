import React from "react";
import Context from "./Context";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    error: null,
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <form className="form-login">
          <fieldset>
            <legend>Login</legend>
            <div className="error">{error && <p>{error}</p>}</div>
            <div>
              <label>
                User Name:{"    "}
                <input
                  type="text"
                  name="username"
                  id="username"
                  aria-label="Enter your user name"
                  aria-required="true"
                  required
                />
              </label>
              <br />
              <label>
                Password:{"   "}
                <input
                  type="password"
                  name="password"
                  id="password"
                  aria-label="Enter your password"
                  aria-required="true"
                  required
                />{" "}
              </label>
            </div>
          </fieldset>
          <div>
            <button type="submit" className="btn-submit">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}
