import React from "react";
import Context from "../Context/Context";
import AuthApiService from "../Services/auth-api-service";
import GetApiService from "../Services/get-api-service";
import TokenService from "../Services/token-service";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    error: null,
  };

  // handleSubmit = (e) => {
  //   const users = this.context.users;
  //   const username = e.target.username.value;
  //   const password = e.target.password.value;
  //   const match = users
  //     .filter((u) => u.username === username)
  //     .filter((u) => u.password === password);

  //   if (match.length) {
  //     console.log("we have a match!");
  //     this.context.setCurrentUser(username);
  //     this.context.setUserPuzzles(username);
  //     this.handleLoginSuccess();
  //   } else {
  //     console.log("no such user");
  //   }
  // };

  handleSubmitJwtAuth = (e) => {
    this.setState({ error: null });
    const user_name = e.target.username.value;
    const password = e.target.password.value;

    AuthApiService.postLogin({
      user_name: user_name,
      password: password,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        this.handleLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error.message });
      });
  };

  // this fn needs to be updated
  handleLoginSuccess = () => {
    GetApiService.getUser().then((res) => {});
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
