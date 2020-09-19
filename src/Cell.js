import React from "react";

function Cell({
  cellSize,
  row,
  col,
  selectCell,
  selectedCell,
  selectedAnswer,
  blocked,
  cellNumberLabel,
  cellCharacterLabel,
  handleKeydown,
  handleDoubleClick,
  cells,
  word,
}) {
  //
  // let highlighted = highlightedCells || [];
  // let isHighlighted = highlighted.includes(cellNumber);

  let highlight = selectedAnswer.some((a) => a === cells.id);

  function handleClick(cell) {
    selectCell(cell.id, word);
  }

  return (
    <g
      className={`crossword__cell 
            ${selectedCell ? "crossword__cell--selected" : ""} 
            ${!blocked ? "crossword__cell--filled" : ""}
            ${highlight ? "crossword__cell--highlighted" : ""}
            `}
    >
      <rect
        x={col * cellSize}
        y={row * cellSize}
        width={cellSize}
        height={cellSize}
        onClick={() => {
          handleClick(cells);
        }}
        onDoubleClick={() => handleDoubleClick()}
        onKeyDown={(e) => handleKeydown(e)}
        tabIndex="0"
        vectorEffect="non-scaling-stroke"
      ></rect>
      <text
        className="crossword__cell--letter"
        x={col * cellSize + 16}
        y={row * cellSize + 24}
      >
        {cellCharacterLabel}
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
