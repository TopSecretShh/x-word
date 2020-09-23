import React, { useContext } from "react";
import Context from '../Context/Context';



const Clues = () => {

  const {
    cellOrientation,
    cellNumber,
    pickCell,
    doubleClick
  } = useContext(Context);


  let across = [];
  let down = [];

  function handleClick(i, direction) {
    console.log(i, 'HERE???????', direction)
    pickCell(i);
    doubleClick(direction);
  }

  cellOrientation.forEach((b, i) => {
    if (b === "across") {
      across.push(
        <li key={i} onClick={() => handleClick(i, true)}>
          {cellNumber[i]}
        </li>
      );
    } else if (b === "down") {
      down.push(
        <li key={i} onClick={() => handleClick(i, false)}>
          {cellNumber[i]}
        </li>
      );
    } else if (b === "acrossdown") {
      across.push(
        <li key={i} onClick={() => handleClick(i, true)}>
          {cellNumber[i]}
        </li>
      );
      down.push(
        <li key={i} onClick={() => handleClick(i, false)}>
          {cellNumber[i]}
        </li>
      );
    }
  });

  return (
    <div className="clue__container">
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
    </div>
  );
}
export default Clues;
