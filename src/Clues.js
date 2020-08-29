import React from "react";

function Clues({ blocks }) {
let across = []
let down = []

blocks.forEach((b, i) => {
  if (b[1] === "across") {
    across.push(<li key={i}>{b[0]}</li>)
  } else if (b[1] === "down") {
    down.push(<li key={i}>{b[0]}</li>)
  } else if (b[1] === "acrossdown") {
    across.push(<li key={i}>{b[0]}</li>)
    down.push(<li key={i}>{b[0]}</li>)
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
