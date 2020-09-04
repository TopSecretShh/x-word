import React, { useContext } from "react";
import Context from "./Context";

function Cell({
  cellSize,
  row,
  col,
  cellNumber,
  selectedCell,
  blocked,
  cellNumberLabel,
  cellCharacterLabel,
}) {
  const value = useContext(Context);
  return (
    <g
      className={`crossword__cell ${
        selectedCell ? "crossword__cell--selected" : ""
      } ${blocked ? "crossword__cell--filled" : ""}`}
    >
      <rect
        x={col * cellSize}
        y={row * cellSize}
        width={cellSize - 1}
        height={cellSize - 1}
        onClick={() => value.selectCell(cellNumber)}
        onDoubleClick={() => value.handleDoubleClick()}
        onKeyDown={(e) => value.handleKeydown(e)}
        tabIndex="0"
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
