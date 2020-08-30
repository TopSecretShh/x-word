import React from "react";

function Clues({ cellOrientation, cellNumber }) {
let across = []
let down = []

cellOrientation.forEach((b, i) => {
  if (b === "across") {
    across.push(<li key={i}>{cellNumber[i]}</li>)
  } else if (b === "down") {
    down.push(<li key={i}>{cellNumber[i]}</li>)
  } else if (b === "acrossdown") {
    across.push(<li key={i}>{cellNumber[i]}</li>)
    down.push(<li key={i}>{cellNumber[i]}</li>)
  }
})

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
