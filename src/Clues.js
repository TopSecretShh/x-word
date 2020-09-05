import React from "react";

function Clues({ cellOrientation, cellNumber, cols, rows }) {
let across = []
let down = []

let ranges = cellOrientation.map((c, i, arr) => {
  if (c === "across") {
    let next = arr.indexOf('across', i + 1)
   return  next > 0 ? next - i : cols - i % cols 
  } else if (c === "down") {
    let next = arr.findIndex((c, j) => {
      return (c === "down" && j > i) && j % cols === 0 
    })
    // console.log(next)
    return next > 0 ? next : rows
  }
  return null
})

console.log(ranges)

// could fill in cells by number, for example, 1, 1, 1, 2, 2, 3, 3, 

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
