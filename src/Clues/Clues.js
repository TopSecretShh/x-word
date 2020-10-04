import React from "react";
import "./Clues.css"

function Clues({ cellOrientation, cellNumber, selectCell, handleDoubleClick }) {
  let across = [];
  let down = [];

  function handleClick(i, direction) {
    selectCell(i);
    handleDoubleClick(direction);
  }

  /* 
  experimenting with how to display clues
  Phil only display the across and down clue for the currently selected cell, with fill suggestions for both.

  Personally, I like being able to see all clues at the same time, but being able to see clues and the grid at the same time is crucial. Maybe a scrollable list of clues?
  */
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

  return (
    <div className="clues">
      <div>
        <h3>Across</h3>
        <ul className="clues__list">{across}</ul>
      </div>

      <div>
        <h3>Down</h3>
        <ul className="clues__list">{down}</ul>
      </div>
    </div>
  );
}
export default Clues;
