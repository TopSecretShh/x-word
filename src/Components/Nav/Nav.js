import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../../Context/Context";

function Nav() {
  const context = useContext(Context);
  const user = context.currentUser.length;

  const location = useLocation();
  console.log("location: ", location.pathname);

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
      case "/login":
        return <></>;
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
    }
  }

  return (
    <div>
      <SwitchNav location={location.pathname} />
    </div>
  );
}

export default Nav;
