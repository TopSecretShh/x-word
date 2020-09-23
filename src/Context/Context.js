import React from "react";
import { users } from '../tempData';
import PATTERNONE from './Patterns';

const Context = React.createContext({
  users: users,
  currentUser: null,
  addNewUser: () => { },
  setCurrentUser: () => { },

  rows: 3,
  cols: 3,
  title: "Untitled",
  custom: false,
  blocks: Array(9).fill(true),
  selectedCell: null,
  selectedAnswer: null,
  orientationIsHorizontal: true,
  cellOrientation: [],
  cellNumber: [],
  
  setSize: () => { },
  createCustom: () => { },
  patternButton: () => { },
  clearLetters: () => { },
  clearGrid: () => { },
  pickCell: () => { },
  addToCellOrientation: () => {},
  updateCellNumber: () => {},
  updateCells: () => {},
  doubleClick: () => { },
  updateCell: () => { },
  fillCell: () => { },
  keydown: () => { },

  error: null,
});
export default Context;




export class ContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users,
      currentUser: null,

      rows: 3,
      cols: 3,
      title: "Untitled",
      custom: false,
      blocks: Array(9).fill(true),
      selectedCell: null,
      selectedAnswer: null,
      orientationIsHorizontal: true,
      cellOrientation: [],
      cellNumber: [],
      error: null,

    }
  }

  setError = (err) => {
    this.setState({
      error: err
    })
  };

  addNewUser = (username, password) => {
    const newUser = {
      id: this.state.users.length + 1,
      username: username,
      password: password,
    };

    this.setState({
      users: [...this.state.users, newUser],
    });
  };

  setCurrentUser = (username) => {
    this.setState({
      currentUser: username,
    });
  };

  setSize = (value) => {
    if (value === "daily") {
      this.setState({
        rows: 15,
        cols: 15,
        blocks: Array(225).fill(true),
        selectedCell: null,
      });
    } else if (value === "sunday") {
      this.setState({
        rows: 21,
        cols: 21,
        blocks: Array(441).fill(true),
        selectedCell: null,
      });
    } else if (value === "custom") {
      this.setState({
        custom: true,
      });
    }
    if (this.state.custom) {
      this.setState({
        custom: false,
      });
    }
  };

  createCustom = ({ rows, cols, blocks }) => {
    console.log(
      "custom dimensions: ",
      Number(rows.value),
      parseInt(cols.value)
    );

    this.setState({
      rows: parseInt(rows.value),
      cols: parseInt(cols.value),
      blocks: Array(rows.value * cols.value).fill(true),
      selectedCell: null,
    });
  };

  patternButton = () => {
    if (this.state.rows === 15) {
      this.setState({
        blocks: PATTERNONE,
      });
    }
  };

  clearLetters = () => {
    const grid = this.state.blocks;

    let emptyGrid = grid.map((cell) =>
      typeof cell === "string" ? (cell = true) : cell
    );
    this.setState({
      blocks: emptyGrid,
    });
  };

  clearGrid = () => {
    const { cols, rows } = this.state
    this.setState({
      blocks: Array(rows * cols).fill(true),
    });
  }

  pickCell = (value) => {
    this.setState({
      selectedCell: value,
    })
  };

  addToCellOrientation = (cellOrientation) => {
    this.setState({
      cellOrientation
    })
  }

  updateCellNumber = (cellNumber) => {
    this.setState({
      cellNumber
    })
  }

  updateCells = (cells) => {
    this.setState({
      cells
    })
  }
  doubleClick = (input) => {
    if (input !== undefined) {
      this.setState({
        orientationIsHorizontal: input,
      });
    } else {
      this.setState((prevState) => {
        return {
          orientationIsHorizontal: !prevState.orientationIsHorizontal,
        };
      });
    }
  }

  updateCell = (cell, character, cellTwinNumber) => {
    let blocksCopy = [...this.state.blocks]; // Creates deep copy
    blocksCopy[cell] = character || !blocksCopy[cell]

    if (character) {
      if (typeof blocksCopy[cellTwinNumber] !== 'string') {
        blocksCopy[cellTwinNumber] = true
      }
    } else if (cellTwinNumber !== cell) {
      blocksCopy[cellTwinNumber] = !blocksCopy[cellTwinNumber]
    }

    this.setState({
      blocks: blocksCopy,
    })
  };


  fillCell = (cell, character) => {
    const { rows, cols, orientationIsHorizontal } = this.state;

    const totalSquares = rows * cols - 1;
    const cellTwinNumber = totalSquares - cell;
    const nextCell = orientationIsHorizontal ? cell + 1 : cell + cols;

    if (character) {
      character = character.toUpperCase()
      this.setState({
        selectedCell: nextCell
      })
    }

    this.updateCell(cell, character, cellTwinNumber);
  };


  keydown = (e) => {

    const cell = this.state.selectedCell;
    const { orientationIsHorizontal, cols, rows, blocks, } = this.state

    if (e.key === "." && (cell || cell === 0)) {
      this.fillCell(cell);
    }
    if (e.key.match(/^[a-z]+$/)) {
      this.fillCell(cell, e.key);
    }
    if (e.key.match(/\s/g)) {
      if (orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: false,
        });
      } else if (!orientationIsHorizontal) {
        this.setState({
          orientationIsHorizontal: true,
        });
      };
    };


    if (e.key === "ArrowRight") {
      if (((cell + 1) / cols) % 2 === 0 || ((cell + 1) / cols) % 2 === 1) {
        console.log("right edge");
      } else {
        this.setState({
          selectedCell: cell + 1,
        });
      }
    }
    if (e.key === "ArrowLeft") {
      if (cell === 0 || (cell / cols) % 2 === 0 || (cell / cols) % 2 === 1) {
        console.log("left edge");
      } else {
        this.setState({
          selectedCell: cell - 1,
        });
      }
    }
    if (e.key === "ArrowUp") {
      if (cell > cols - 1) {
        this.setState({
          selectedCell: cell - cols,
        });
      }
    }
    if (e.key === "ArrowDown") {
      if (cell < cols * rows - cols) {
        this.setState({
          selectedCell: cell + cols,
        });
      }
    }

    if (e.key === "Backspace" || e.key === 'Delete') {
      if (orientationIsHorizontal) {
        if (typeof blocks[cell] === "string") {
          // TODO this works but maybe shouldn't? we're modifying state without calling setState?
          // blocks[cell] = false;

          let newBlocks = this.updateCell(cell, true);

          this.setState({
            blocks: newBlocks,
          });
        }
        if (cell === 0 || (cell / cols) % 2 === 0 || (cell / cols) % 2 === 1) {
          this.setState({
            selectedCell: cell,
          });
        } else {
          this.setState({
            selectedCell: cell - 1,
          });
        }
      } else {
        if (typeof blocks[cell] === "string") {
          // TODO this works but maybe shouldn't? we're modifying state without calling setState?
          // blocks[cell] = false;

          let newBlocks = this.updateCell(cell, false);

          this.setState({
            blocks: newBlocks,
          });
        }
        if (cell > cols - 1) {
          console.log("not top edge");
          this.setState({
            selectedCell: cell - cols,
          });
        } else {
          this.setState({
            selectedCell: cell,
          });
        }
      }
    }
    e.preventDefault();
  };


  render() {
    const contextValue = {
      currentUser: this.state.currentUser,
      users: this.state.users,
      addNewUser: this.addNewUser,
      setCurrentUser: this.setCurrentUser,

      rows: this.state.rows,
      cols: this.state.cols,
      title: this.state.title,
      custom: this.state.custom,
      blocks: this.state.blocks,
      selectedCell: this.state.selectedCell,
      orientationIsHorizontal: this.state.orientationIsHorizontal,
      cellOrientation: this.state.cellOrientation,
      cellNumber: this.state.cellNumber,
      cells: this.state.cells,

      setSize: this.setSize,
      createCustom: this.createCustom,
      patternButton: this.patternButton,
      clearLetters: this.clearLetters,
      clearGrid: this.clearGrid,
      pickCell: this.pickCell,
      addToCellOrientation: this.addToCellOrientation,
      updateCellNumber:this.updateCellNumber,
      updateCells: this.updateCells,
      doubleClick: this.doubleClick,
      updateCell: this.updateCell,
      fillCell: this.fillCell,
      keydown: this.keydown,
      error: this.state.error,
    }


    return (
      <Context.Provider value={contextValue} >
        {this.props.children}
      </Context.Provider >
    )
  }
}