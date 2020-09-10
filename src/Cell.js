import React from 'react'; 


  
function Cell(
  {cellSize, 
  row, 
  col,
  cellNumber, 
  inputCell, 
  selectCell, 
  selectedCell, 
  selectAnswer,
  selectedAnswer,
  blocked, 
  cellNumberLabel, 
  cellCharacterLabel,
  changeOrientation,
  highlightedCells,
  cells}
  ) 
{ 
  let highlighted = highlightedCells || []
  let isHighlighted = highlighted.includes(cellNumber)

  
  
  
  function handleClick (cell) {
    selectAnswer(cell)
    selectCell(cell.id)
  }
  
  return <g   
          className={`crossword__cell 
            ${selectedCell ?
            'crossword__cell--selected' : ""} 
            ${blocked ?
            'crossword__cell--filled' : ""}
            ${isHighlighted ?
            'crossword__cell--highlighted' : ""}
            ${selectedAnswer ?
            'crossword__cell--highlighted' : ""}
            `}
          >
            <rect
              x={col * cellSize}
              y={row * cellSize}
              width={cellSize} 
              height={cellSize}
              onClick={() => handleClick(cells)}
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