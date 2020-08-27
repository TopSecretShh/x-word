import React from 'react';  
  
function Cell({cellSize, row, col, cellNumber, selectCell, selectedCell, blocked, cellNumberLabel}) 
{ 
  return <g   
          className={`crossword__cell ${selectedCell ? 'crossword__cell--selected' : ""} ${blocked ? 'crossword__cell--filled' : ""}`}>
            <rect
              x={col * cellSize}
              y={row * cellSize}
              width={cellSize - 1} 
              height={cellSize - 1}
              onClick={() => selectCell(cellNumber)}
              >
            </rect>
            <text 
              className='crossword__cell--number'
              x={col * cellSize + 2}
              y={row * cellSize + 10}>
                {cellNumberLabel}
            </text>
  </g>
} 
  
export default Cell; 