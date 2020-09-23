import React from "react";
import {users} from '../tempData';
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
  setSize: () => {},
  createCustom: () => {},
  patternButton: () => {},
  clearLetters: () => {},
  pickCell: () => {},
  doubleClick: () => {},
});
export default Context ;




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

  createCustom = ({rows, cols, blocks}) => {
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
    //what's this for?????????
    console.log("pattern: ", PATTERNONE);
    if (this.state.rows === 15) {
      this.setState({
        blocks: PATTERNONE,
      });
    }
  };

  clearLetters = () => {
    let grid = this.state.blocks;
    let emptyGrid = grid.map((cell) =>
      typeof cell === "string" ? (cell = true) : cell
    );
    this.setState({
      blocks: emptyGrid,
    });
  };

  clearGrid = () => {
    //isn't it exactly the same as clear letters?
    this.setState({
      blocks: Array(this.state.rows * this.state.cols).fill(true),
    });
  }

  pickCell = (value) => {
    console.log(value, 'PICK CELL')
    this.setState({
    selectedCell: value,
  })
};

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
      setSize: this.setSize,
      createCustom: this.createCustom,
      patternButton: this.patternButton,
      clearLetters: this.clearLetters,
      pickCell: this.pickCell,
      doubleClick: this.doubleClick,
      error: this.state.error,
    }

    
    return (
      <Context.Provider value={contextValue} >
        {this.props.children}
      </Context.Provider >
    )
  }
}