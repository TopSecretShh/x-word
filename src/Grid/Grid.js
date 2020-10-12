import React from "react";
import Clues from "../Clues/Clues";
import Fills from "../Fills/Fills";
import Cell from "../Cell/Cell"

import "./Grid.css"

// Fix grid extending out of view when rows > cols

export default class Grid extends React.Component {
    
    selectCell = (value) => {
        this.props.selectCell(value)
    };
      
    handleDoubleClick = (input) => {
        this.props.handleDoubleClick(input)
    }
    
    handleKeydown = (e, word) => {
        this.props.handleKeydown(e, word)
    }

    renderGrid = (cellNumber, cellId, selectedAnswer, word) => {
        let cols = this.props.cols;
        let cells = this.props.cells;
    
        let grid = cells.map((cell, i) => {
          return (
            <Cell
              key={i}
              cellSize={33}
              row={Math.floor(i / cols)}
              col={i % cols}
              selectCell={this.selectCell}
              selectedCell={i === this.props.selectedCell}
              isNotBlocked={cell}
              cellNumberLabel={cellNumber[i]}
              handleKeydown={this.props.handleKeydown}
              handleDoubleClick={this.props.handleDoubleClick}
              cellId={cellId[i]}
              selectedAnswer={selectedAnswer}
              word={word}
            />
          );
        });
        return grid;
    };

    createWord = (groupAcross, groupDown, cells) => {
        console.log('creating grid')
        let group =
          (this.props.orientationIsHorizontal ? groupAcross : groupDown) || [];
        let selectedAnswer =
          group.find((g) => g.some((x) => x === this.props.selectedCell)) || [];
        let word = [];
        selectedAnswer
          .sort((a, b) => a - b)
          .forEach((i) =>
            typeof cells[i] === "string" ? word.push(cells[i]) : word.push("?")
          );
        word = word.join("");
        return { selectedAnswer, word };
    };

    createCells = () => {
          // setting the stage
          const {rows, cols, cells} = this.props

          // internal variables
          let counter = 0;
          let groupAcross = [];
          let groupDown = [];
      
          // variables to be exported
          let cellOrientation = [];
          let cellNumber = [];
          let cellId = [];
      
          cells.forEach((_, i) => {
            // assigns ID to cell
            cellId.push(i);
      
            // figures out if cell should have a number based on block position
            let isCellBlocked = cells[i] === false;
            let isCellBeforeBlocked = cells[i - 1] === false || i % cols === 0;
            let isCellAfterBlocked = cells[i + 1] === false || (i + 1) % cols === 0;
            let isCellAboveBlocked = cells[i - cols] === false || i - cols < 0;
            let isCellBelowBlocked =
              cells[i + cols] === false || i + cols >= rows * cols;
      
            // helps figure out what word/clue a cell belongs to
            function findSiblings(clue, direction) {
              if (cells[clue] === false) return [];
              let arr = [clue];
      
              if (direction === "across") {
                for (let i = clue + 1; cells[i] !== false && i % cols !== 0; i++) {
                  arr.push(i);
                }
                if (clue % cols !== 0) {
                  for (
                    let i = clue - 1;
                    i >= 0 && cells[i] !== false && (i + 1) % cols !== 0;
                    i--
                  ) {
                    arr.push(i);
                  }
                }
              }
      
              if (direction === "down") {
                for (let i = clue - cols; cells[i] !== false && i >= 0; i -= cols) {
                  arr.push(i);
                }
                for (
                  let i = clue + cols;
                  cells[i] !== false && i < rows * cols;
                  i += cols
                ) {
                  arr.push(i);
                }
              }
              return arr.sort();
            }
      
            // the following if/elses assigns appropriate cellOrientation for Clues.js and groupAcross/Down for figuring out selectedAnswer for Fills.js (to send word fragment to API) and Cell.js (to highlight)
            if (isCellBlocked) {
              cellOrientation.push(null);
              cellNumber.push(null);
              return;
            }
            if (
              isCellAboveBlocked &&
              isCellBeforeBlocked &&
              !isCellAfterBlocked &&
              !isCellBelowBlocked
            ) {
              counter++;
              cellNumber.push(counter);
              cellOrientation.push("acrossdown"); // This should add down and across, not 'acrossdown'
              groupAcross.push(findSiblings(i, "across"));
              groupDown.push(findSiblings(i, "down"));
            } else if (isCellBeforeBlocked && !isCellAfterBlocked) {
              counter++;
              cellNumber.push(counter);
              cellOrientation.push("across");
              groupAcross.push(findSiblings(i, "across"));
            } else if (isCellAboveBlocked && !isCellBelowBlocked) {
              counter++;
              cellNumber.push(counter);
              cellOrientation.push("down");
              groupDown.push(findSiblings(i, "down"));
            } else {
              cellOrientation.push(null);
              cellNumber.push(null);
            }
          });
      
          return {
            cellOrientation,
            cellNumber,
            cellId,
            groupAcross,
            groupDown,
            cells,
          };
    };


    render() {
        const {
            cellOrientation,
            cellNumber,
            cellId,
            groupAcross,
            groupDown,
            cells,
        } = this.createCells();

        const { selectedAnswer, word } = this.createWord(
            groupAcross,
            groupDown,
            cells
        );


        const {rows, cols} = this.props;
        const width = cols * 33;
        const height = rows * 33;

        return (
            <>
              <div className='grid-and-clues__container'>
                <div className="grid__container">
                    <svg
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="xMinYMin slice"
                    className={`Grid ${
                    rows <= cols ? "view_box--wide" : "view_box--tall"
                    }`}
                    id="grid">
                        {this.renderGrid(cellNumber, cellId, selectedAnswer, word)}
                    </svg>
                </div>
                <Clues
                cellOrientation={cellOrientation}
                cellNumber={cellNumber}
                selectCell={this.selectCell}
                handleDoubleClick={(direction) =>
                    this.handleDoubleClick(direction)
                }
                cellId={cellId}
                />
              </div>
              <Fills
                word={word}
                fillInWord={this.props.fillInWord}
                selectedAnswer={selectedAnswer}
                cells={cells}
                />
            </>
        )
    }
}