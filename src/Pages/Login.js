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

  handleLoginSuccess = () => {
    GetApiService.getUser()
      .then((res) => {
        const userInfo = {
          user_id: res.id,
          user_name: res.user_name,
        };
        this.props.setCurrentUser(userInfo);
        // TODO if there are no user puzzles, this causes errors in the console
        this.props.setUserPuzzles(userInfo.user_id);
      })
      .then(() => this.props.history.push("/home"));
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
            this.handleSubmitJwtAuth(e);
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
