// import React, { useState, useEffect } from "react";
import React from "react";
import "./Clues.css";

function Clues({ cellOrientation, cellNumber, selectCell, handleDoubleClick }) {
  /*
  TODO list
  - puzzle in progress save: save this.state.cells for blocks and letters; save clues and clue inputs
  - puzzle completed save:
    - should save everything, just like in progress save, but there will be two display options, depending on use:
      - option one: dev save. same as in progress save
      - option two: ready to solve save. saves this.state.cells for blocks only. saves clues but not as inputs. this puzzle should look like any published puzzle, ready for solving.

  - so for this component I need to find a way to save clues as an array. each clue needs:
    - #
    - across/down
    - input (if any)

  - it seems like it would be easiest to capture all of the information at the same time, when the user hits a save btn.

  - save btn should be in controls component
  
  */

  // const [clues, setClues] = useState("");
  // useEffect(()=> {
  //   setClues()
  // })

  let across = [];
  let down = [];

  function handleClick(i, direction) {
    selectCell(i);
    handleDoubleClick(direction);
  }

  cellOrientation.forEach((b, i) => {
    if (b === "across") {
      across.push(
        <li key={i} onClick={() => handleClick(i, true)}>
          {cellNumber[i]}{" "}
          <input type="text" id={i + "across"} name={i + "across"} />
        </li>
      );
    } else if (b === "down") {
      down.push(
        <li key={i} onClick={() => handleClick(i, false)}>
          {cellNumber[i]}{" "}
          <input type="text" id={i + "down"} name={i + "down"} />
        </li>
      );
    } else if (b === "acrossdown") {
      across.push(
        <li key={i} onClick={() => handleClick(i, true)}>
          {cellNumber[i]}{" "}
          <input type="text" id={i + "across"} name={i + "across"} />
        </li>
      );
      down.push(
        <li key={i} onClick={() => handleClick(i, false)}>
          {cellNumber[i]}{" "}
          <input type="text" id={i + "down"} name={i + "down"} />
        </li>
      );
    }
  });

  function handleSubmit(e) {
    console.log("submit: ", e.target);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div className="clues__container">
        <div>
          <h3>Across</h3>
          <ul className="clues__list">{across}</ul>
        </div>

        <div>
          <h3>Down</h3>
          <ul className="clues__list">{down}</ul>
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
export default Clues;
