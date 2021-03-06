import React from "react";

function ClueStats({ cellOrientation }) {
  let across = 0;
  let down = 0;

  for (let i = 0; i < cellOrientation.length; i++) {
    if (cellOrientation[i] === "across") {
      across++;
    } else if (cellOrientation[i] === "down") {
      down++;
    } else if (cellOrientation[i] === "acrossdown") {
      across++;
      down++;
    }
  }

  return (
    <div>
      <p>
        <strong>Number of Clues</strong>
      </p>
      <p>Across: {across}</p>
      <p>Down: {down}</p>
    </div>
  );
}

export default ClueStats;
