import React, { useContext, useEffect } from 'react';
import Cell from '../Cell';
import Context from '../../Context/Context';
import PuzzleOptionsBar from '../PuzzleOptionsBar';
import { puzzleBoardSetup } from './puzzleBoardSetup';

const PuzzleBoard = () => {
    const { 
        rows, 
        cols, 
        blocks, 
        selectedCell, 
        orientationIsHorizontal,
        addToCellOrientation, 
        updateCellNumber,
        updateCells
    } = useContext(Context);

    const { 
        cells,
        cellNumber,
        cellOrientation,
        groupAcross,
        groupDown 
    } = puzzleBoardSetup(blocks, cols, rows);
    
    useEffect(() => {
        addToCellOrientation(cellOrientation);
        updateCellNumber(cellNumber);
        updateCells(cells)
      },[]);

    let group = (orientationIsHorizontal ? groupAcross : groupDown) || [];

    let selectedAnswer = group.find(g => g.some((x) => x === selectedCell)) || [];

    return (
        <div className="crossword__container--grid-wrapper">
            <svg
                viewBox={`0 0 ${cols * 33} ${rows * 33}`}
                preserveAspectRatio="xMinYMin slice"
                className={`Grid ${
                    rows >= cols ? "view_box--tall" : "view_box--wide"
                    }`}
                id="grid"
            >
                {blocks.map((block, i) => {
                    return (
                        <Cell
                            key={i}
                            cellSize={33}
                            row={Math.floor(i / cols)}
                            col={i % cols}
                            selectedCell={i === selectedCell}
                            blocked={block}
                            cellCharacterLabel={block}
                            cellNumberLabel={i + 1}
                            //highlightedCells={highlightedCells}
                            cells={cells[i]}
                            selectedAnswer={selectedAnswer}
                        />
                    )
                })};
                </svg>
        </div>
    )
};

export default PuzzleBoard;