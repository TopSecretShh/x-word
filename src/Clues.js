import React from "react";

function Clues({ blocks }) {
  console.log(blocks);
  let across = blocks.map((b, i) => {
    return b[1] === "across" || b[1] === "acrossdown" ? (
      <li key={i}>{b[0]}</li>
    ) : null;
  });
  let down = blocks.map((b, i) => {
    return b[1] === "down" || b[1] === "acrossdown" ? (
      <li key={i}>{b[0]}</li>
    ) : null;
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
