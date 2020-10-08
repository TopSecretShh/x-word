import React from "react";
import "./Clues.css";

function Clues({ cellOrientation, cellNumber, selectCell, handleDoubleClick }) {
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

  return (
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
  );
}
export default Clues;
