import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Context from "../../Context/Context";

function Nav() {
  const context = useContext(Context);
  const location = useLocation();
  const history = useHistory();

  function SwitchNav(props) {
    switch (props.location) {
      case "/":
        return (
          <>
            <Link className="btn-login" to="/login">
              Login
            </Link>{" "}
            <Link className="btn-signup" to="/signup">
              Sign Up
            </Link>{" "}
          </>
        );
      case "/home":
        return (
          <>
            <Link
              to="/"
              onClick={() => {
                context.signOut();
              }}
            >
              Sign Out
            </Link>
          </>
        );
      case "/puzzle-editor":
        return (
          <>
            {/* <Link
              to="/home"
              onClick={() => {
                alert("Nothing will be saved");
              }}
            >
              Home
            </Link> */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Return to Home without saving?")) {
                  history.push("/home");
                }
              }}
            >
              Home
            </button>
          </>
        );
      default:
        return <></>;
    }
  }

  return (
    <div>
      <SwitchNav location={location.pathname} />
    </div>
  );
}

export default Nav;
