import React from "react";

function Clues({ cellOrientation, cellNumber, downAnswers, acrossAnswers, setGroup}) {
let across = []
let down = []
let acrossCounter = 0;
let downCounter = 0;

function selectGroup(i) {
  setGroup(i)
}

cellOrientation.forEach((b, i) => {
  if (b === "across") {
    let group = acrossAnswers[acrossCounter]
    across.push(<li onClick={() => selectGroup(group)} key={i}>{cellNumber[i]}</li>)
    acrossCounter++
  } else if (b === "down") {
    let group = downAnswers[downCounter]
    down.push(<li onClick={() => selectGroup(group)} key={i}>{cellNumber[i]}</li>)
    downCounter++
  } else if (b === "acrossdown") {
    let downGroup = downAnswers[downCounter]
    let acrossGroup = acrossAnswers[acrossCounter]
    down.push(<li onClick={() => selectGroup(downGroup)} key={i}>{cellNumber[i]}</li>)
    across.push(<li onClick={() => selectGroup(acrossGroup)} key={i}>{cellNumber[i]}</li>)
    acrossCounter++ 
    downCounter++
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
