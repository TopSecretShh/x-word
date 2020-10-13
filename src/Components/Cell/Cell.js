import React from "react";
import "./Cell.css";

function Cell({
  cellSize,
  row,
  col,
  selectCell,
  selectedCell,
  selectedAnswer,
  isNotBlocked,
  cellNumberLabel,
  handleKeyDown,
  handleDoubleClick,
  cellId,
}) {
  let highlight = selectedAnswer.some((a) => a === cellId);

  function handleClick(cell) {
    selectCell(cell);
  }

  return (
    <g
      className={`crossword__cell 
            ${selectedCell ? "crossword__cell--selected" : ""} 
            ${!isNotBlocked ? "crossword__cell--filled" : ""}
            ${highlight ? "crossword__cell--highlighted" : ""}
            `}
      onClick={() => {
        handleClick(cellId);
      }}
      onDoubleClick={() => handleDoubleClick()}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <rect
        x={col * cellSize}
        y={row * cellSize}
        width={cellSize}
        height={cellSize}
        tabIndex="0"
        vectorEffect="non-scaling-stroke"
      ></rect>
      <text
        className="crossword__cell--letter"
        x={col * cellSize + 16}
        y={row * cellSize + 24}
      >
        {isNotBlocked}
      </text>
      <text
        className="crossword__cell--number"
        x={col * cellSize + 2}
        y={row * cellSize + 10}
      >
        {cellNumberLabel}
      </text>
    </g>
  );
}

export default Cell;