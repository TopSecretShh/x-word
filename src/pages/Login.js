import React from "react";
import Context from "../Context/Context";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    error: null,
  };

  handleSubmit = (e) => {
    const users = this.context.users;
    console.log(this.context, users, 'in login', e.target.username.value, e.target.password.value)
    const username = e.target.username.value;
    const password = e.target.password.value;
    const match = users
      .filter((u) => u.username === username)
      .filter((u) => u.password === password);

    if (match.length) {
      console.log("we have a match!");
      this.context.setCurrentUser(username);
      this.handleLoginSuccess();
    } else {
      console.log("no such user");
    }
  };

  handleLoginSuccess = () => {
    this.props.history.push("/home");
  };

  handleCancelBtn = () => {
    this.props.history.push("/");
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <form
          className="form-login"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit(e);
          }}
        >
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

            <button
              type="button"
              className="btn-cancel"
              onClick={this.handleCancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
