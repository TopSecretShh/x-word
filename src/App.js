import React from "react";
import Grid from "./Grid";
import Clues from "./Clues"
import Context from "./Context";
import "./App.css";

export default class App extends React.Component {
  static contextType = Context;

  state = {
    rows: 15,
    cols: 15,
    title: "Untitled",
    author: "Anonymous",
    blocks: Array(225).fill(false),
    selectedCell: null
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown)
  }

  setSize = (value) => {
    if (value === "daily") {
      this.setState({
        rows: 15,
        cols: 15,
      });
    } else if (value === "sunday") {
      this.setState({
        rows: 21,
        cols: 21,
      });
    }
  };

  selectCell = (value) => {
    this.setState({
      selectedCell: value
    })
  }

  handleKeydown = (e) => {
    const cell = this.state.selectedCell
    const blocks = [...this.state.blocks]
    blocks[cell] = !blocks[cell]
    // Middle cell won't become a block
    blocks[(this.state.rows * this.state.cols) - cell - 1] = !blocks[(this.state.rows * this.state.cols) - cell - 1] 
   
    if (e.code === "Period" && cell) {
       this.setState({
      blocks: blocks
    })
    }
  }

  render() {
    const value = {
      rows: this.state.rows,
      cols: this.state.cols,
      title: this.state.title,
      author: this.state.author,
    };

    let rows = this.state.rows;
    let blocks = this.state.blocks
    let counter = 0;
  
    let cellProperties = blocks.map((block, i) => {
      let isBlockFilled = block
      let isBlockBeforeFilled = blocks[i - 1] || i % rows === 0;
      let isBlockAfterFilled = blocks[i + 1] || (i + 1) % rows === 0;
      let isBlockAboveFilled = blocks[i - rows] || i - rows < 0;
      let isBlockBelowFilled = blocks[i + rows] || i + rows > rows * rows;
      

      if (isBlockFilled) {
        return [null, null]
      } else if ((isBlockAboveFilled && isBlockBeforeFilled) && (!isBlockAfterFilled && !isBlockBelowFilled)) {
        counter++
        return [counter, 'acrossdown']
      } else if (isBlockBeforeFilled && !isBlockAfterFilled) {
        counter++
        return [counter, 'across']
      } else if (isBlockAboveFilled && !isBlockBelowFilled) {
        counter++ 
        return [counter, 'down']
      }
      
      return [null, null]
    })
    return (
      <Context.Provider value={value}>
        <div className="App" onKeyDown={() => this.handleKeyDown()} >
          <h1>{this.state.title}</h1>
          <p>by {this.state.author}</p>

          <div className="size-btns">
            <h3>Size</h3>
            <button
              type="button"
              value="daily"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Daily
            </button>
            <button
              type="button"
              value="sunday"
              onClick={(e) => this.setSize(e.target.value)}
            >
              Sunday
            </button>
          </div>
          <div className='puzzle'>
            <Grid 
              selectedCell={this.state.selectedCell} 
              selectCell={(cell) => this.selectCell(cell)}
              blocks={this.state.blocks}
              cellNumberLabels={cellProperties}
              />
            <Clues
              blocks={cellProperties} 
            />
          </div>
        </div>
      </Context.Provider>
    );
  }
}
