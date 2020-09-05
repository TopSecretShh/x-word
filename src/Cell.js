import React from 'react'; 


  
function Cell(
  {cellSize, 
  row, 
  col,
  cellNumber, 
  inputCell, 
  selectCell, 
  selectedCell, 
  blocked, 
  cellNumberLabel, 
  cellCharacterLabel,
  changeOrientation}
  ) 
{ 
  return <g   
          className={`crossword__cell ${selectedCell ? 'crossword__cell--selected' : ""} ${(blocked) ? 'crossword__cell--filled' : ""}`}>
            <rect
              x={col * cellSize}
              y={row * cellSize}
              width={cellSize} 
              height={cellSize}
              onClick={() => selectCell(cellNumber)}
              onDoubleClick={() => changeOrientation()}
              onKeyDown={(e) => inputCell(e)}
              tabIndex="0"
              vectorEffect="non-scaling-stroke"
              >
            </rect>
            <text 
              className='crossword__cell--letter'
              x={col * cellSize + 16}
              y={row * cellSize + 24}>
                {cellCharacterLabel}
            </text>
            <text 
              className='crossword__cell--number'
              x={col * cellSize + 2}
              y={row * cellSize + 10}>
                {cellNumberLabel}
            </text>
  </g>
} 
  
export default Cell; 