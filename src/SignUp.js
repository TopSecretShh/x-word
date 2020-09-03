import React from "react";
import Context from "./Context";

export default class SignUp extends React.Component {
  static contextType = Context;

  state = {
    username: "",
    password: "",
    error: null,
  };

  updateUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = () => {
    console.log("signed up");
    this.props.history.push("/login");
  };

  render() {
    const { error } = this.state;
    return (
      <div className="SignUp">
        <form
          className="form-signup"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <fieldset>
            <legend>User Information</legend>

            <label>
              User Name:{"  "}
              <input
                type="text"
                name="username"
                id="username"
                aria-label="Create your user name"
                aria-required="true"
                onChange={(e) => this.updateUsername(e)}
                required
              />
            </label>
            <label>
              Password:{"  "}
              <input
                type="password"
                name="password"
                id="password"
                aria-label="Create your password"
                aria-required="true"
                onChange={(e) => this.updatePassword(e)}
                required
              />
            </label>

            <div className="pass-info">
              {/* we can change this to whatever level of security is appropriate to a crossword puzzle generator... */}
              <p>
                Password must be at least 8 characters long and include your
                social security number and bank details
              </p>
            </div>
          </fieldset>
          <button type="submit" className="btn-submit">
            Sign Up
          </button>
        </form>
        <div className="error">{error && <p>{error}</p>}</div>
      </div>
    );
  }
}
