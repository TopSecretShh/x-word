import React from "react";

function Clues({ cellOrientation, cellNumber, selectCell, selectAnswer, cells}) {
let across = []
let down = []


function handleClick(i, direction) {
  selectCell(cellNumber[i])
  selectAnswer(cells[i], direction)
  console.log(direction)
}

cellOrientation.forEach((b, i) => {
  if (b === "across") {
    across.push(<li onClick={() => handleClick(i, true)} key={i}>{cellNumber[i]}</li>)
  } else if (b === "down") {
    down.push(<li onClick={() => handleClick(i, false)} key={i}>{cellNumber[i]}</li>)
  } else if (b === "acrossdown") {
    down.push(<li onClick={() => handleClick(i, false)} key={i}>{cellNumber[i]}</li>)
    across.push(<li onClick={() => handleClick(i, true)} key={i}>{cellNumber[i]}</li>)
  }
})

  return (
    <>
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
    </>
 
  );
}
export default Clues;
