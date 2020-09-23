import React from 'react';
import Cell from '../components/Cell';
import Context from '../Context/Context';

export default class PuzzleBoard extends React.Component {
    static contextType = Context;


    render() {
        const { rows, cols, blocks, pickCell, selectedCell, highlightedCells, orientationIsHorizontal } = this.context;
        let counter = 0;
        let cellOrientation = [];
        let cellNumber = [];

        let groupAcross = [];
        let groupDown = [];
        let cells = [];
        blocks.forEach((_, i) => {
            let isBlockFilled = blocks[i] === false;

            let isBlockBeforeFilled = blocks[i - 1] === false || i % cols === 0;

            let isBlockAfterFilled = blocks[i + 1] === false || (i + 1) % cols === 0;

            let isBlockAboveFilled = blocks[i - cols] === false || i - cols < 0;

            let isBlockBelowFilled =
                blocks[i + cols] === false || i + cols >= rows * cols;

            cells.push({
                id: i,
                block: blocks[i], // May not be needed
                number: null,
                character: blocks[i] ? blocks[i] : "", // May not be needed
            });

            function findSiblings(clue, direction) {
                if (blocks[clue] === false) return [];
                let arr = [clue];

                if (direction === "across") {
                    for (let i = clue + 1; blocks[i] !== false && i % cols !== 0; i++) {
                        arr.push(i);
                    }
                    if (clue % cols !== 0) {
                        for (
                            let i = clue - 1;
                            i >= 0 && blocks[i] !== false && (i + 1) % cols !== 0;
                            i--
                        ) {
                            arr.push(i);
                        }
                    }
                }

                if (direction === "down") {
                    for (let i = clue - cols; blocks[i] !== false && i >= 0; i -= cols) {
                        arr.push(i);
                    }
                    for (
                        let i = clue + cols;
                        blocks[i] !== false && i < rows * cols;
                        i += cols
                    ) {
                        arr.push(i);
                    }
                }

                return arr.sort();
            }

            if (isBlockFilled) {
                cellOrientation.push(null);
                cellNumber.push(null);
                cells[i].block = false;
                return;
            }
            if (
                isBlockAboveFilled &&
                isBlockBeforeFilled &&
                !isBlockAfterFilled &&
                !isBlockBelowFilled
            ) {
                counter++;
                cellNumber.push(counter);
                cellOrientation.push("acrossdown"); // This should add down and across, not 'acrossdown'
                cells[i].number = counter;
                groupAcross.push(findSiblings(i, "across"));
                groupDown.push(findSiblings(i, "down"));
            } else if (isBlockBeforeFilled && !isBlockAfterFilled) {
                counter++;
                cellNumber.push(counter);
                cellOrientation.push("across");
                cells[i].number = counter;
                groupAcross.push(findSiblings(i, "across"));
            } else if (isBlockAboveFilled && !isBlockBelowFilled) {
                counter++;
                cellNumber.push(counter);
                cellOrientation.push("down");
                cells[i].number = counter;
                groupDown.push(findSiblings(i, "down"));
            } else {
                cellOrientation.push(null);
                cellNumber.push(null);
            }
        });

        let group =
            (orientationIsHorizontal ? groupAcross : groupDown) || [];

        let selectedAnswer =
            group.find(g => g.some((x) => x === selectedCell)) || [];



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
                        //console.log(block, '?????')
                        return (
                            <Cell
                                key={i}
                                cellSize={33}
                                row={Math.floor(i / cols)}
                                col={i % cols}
                                selectedCell={i === selectedCell}
                                pickCell={pickCell}
                                blocked={block}
                                cellCharacterLabel={block}
                                cellNumberLabel={i + 1}
                                // handleKeydown={handleKeydown}
                                // handleDoubleClick={handleDoubleClick}
                                highlightedCells={highlightedCells}
                                cells={cells[i]}
                                selectedAnswer={selectedAnswer}
                            />
                        )
                    })};
                </svg>
            </div>
        )
    };
}