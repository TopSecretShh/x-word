import React, { useContext } from "react";
import Context from "../Context/Context";
import {withRouter} from 'react-router-dom';

const Login = (props) => {
  const { users, setCurrentUser, setError, error} = useContext(Context);

  const handleSubmit = (e) => {
    const username = e.target.username.value;
    const password = e.target.password.value;
    const match = users
      .filter((u) => u.username === username)
      .filter((u) => u.password === password);

    if (match.length) {
      console.log("we have a match!");
      setCurrentUser(username);
      handleLoginSuccess();
    } else {
      console.log("no such user");
      setError("no such user")
    }
  };

  const handleLoginSuccess = () => {
    props.history.push("/puzzle");
  };

  const handleCancelBtn = () => {
    props.history.push("/");
  };

    return (
      <div className="Login">
        <form
          className="form-login"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
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
              onClick={handleCancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

export default (withRouter)(Login);