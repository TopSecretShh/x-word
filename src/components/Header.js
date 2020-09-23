import React from "react";
import { Link } from "react-router-dom";

 const Header = () => {
    return (
      <div className="Landing">
        <Link className="btn-alt" to="/">
        <h1>X-Word</h1>
          </Link>
        
        <p>
          A crossword creator for the professional puzzle compiler, for the
          amatuer puzzle builder, for the enthusiastic puzzle solver.
        </p>
        <p>Pardon the dust, construction is ongoing.</p>
        
      </div>
    );
  }

export default Header;
