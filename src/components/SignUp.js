import React from "react";
import Context from "../Context/Context";
import { Link , withRouter} from "react-router-dom";

class SignUp extends React.Component {
  static contextType = Context;

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

  handleSubmit = (e) => {
    e.preventDefault();
    const users = this.context.users;
    const username = e.target.username.value;
    const password = e.target.password.value;

    const match = users.filter((u) => u.username === username);
   

    if (match.length) {
      console.log("user already exists", this.props);
      this.props.history.push("/login");
    } else if (!match.length) {
      this.context.addNewUser(username, password);
      this.props.history.push("/login");
    }
  };

  handleCancelBtn = () => {
    this.props.history.push("/");
  };

  render() {
    let error = null;
        if (this.context.error) {
            error = this.context.error.message;
        }
        
    return (
      <div className="SignUp">
        <form
          className="form-signup"
          onSubmit={(e) => this.handleSubmit(e)}
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
                minLength={3}
                aria-label="Create your password"
                aria-required="true"
                onChange={(e) => this.updatePassword(e)}
                required
              />
            </label>

            <div className="pass-info">
              {/* we can change this to whatever level of security is appropriate to a crossword puzzle generator... */}
              <p>
                Password must be at least 3 characters long and include your
                social security number and bank details
              </p>
            </div>
          </fieldset>
          <button type="submit" className="btn-submit">
            Sign Up
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={this.handleCancelBtn}
          >
            Cancel
          </button>
        </form>
        {/* <div className="username-match">
          {match && (
            <p>
              {this.state.username} already has an account. If you already have
              an account <Link to="/login">Login</Link>. Otherwise, choose a
              different user name and try again.
            </p>
          )}
        </div>  this will be determined later once we have api and proper auth*/} 
        <div className="error">{error && <p>{error}</p>}</div>
      </div>
    );
  }
}
export default (withRouter)(SignUp);