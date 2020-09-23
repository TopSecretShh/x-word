import React from 'react';
import { Link } from "react-router-dom";
import Context from "../Context/Context";


export default class Nav extends React.Component {
    static contextType = Context;
    handleGuestLogin = () => {
        this.context.setCurrentUser("guest");
      };

    render() {
        return (
            <div>
                <Link className="btn-login" to="/signin">
                   SIGN IN
                </Link>
                <span> .......</span>
                <Link className="btn-signup" to="/">
                    SIGN OUT
                </Link>
                <span> .......</span>
                <Link className="btn-alt" to="/puzzle" onClick={this.handleGuestLogin}>
                    Skip to Puzzle as a guest
                </Link>
            </div>
        )
    }
}