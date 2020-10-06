import React from "react";
import "./Fills.css";

// TODO
// Fix synchronization issue // FIXED
// Move some functionality to this component
// Does this actually need state, or to be a class?

export default class Fills extends React.Component {
  state = {
    fills: [],
  };

  componentDidUpdate(prevProps) {
    let word = this.props.word
    if (word !== prevProps.word) {
      this.searchWord(word)
    }
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  searchWord = (word) => {
      fetch(`https://api.datamuse.com/words?sp=${word}`)
          .then(response => response.json())
          .then(data => data.map(word => (word.score > 100 ? word.word : "") ))
          .then(stuff => {
            this.setState({
              fills: stuff
            })
          })
          .then(stuff => stuff)
  };

  render() {
    let preFills = this.state.fills.map((fill, i) => (
      <li
        key={i}
        className="fills__list--item"
        onClick={() => this.props.fillInWord(fill, this.props.selectedAnswer)}
      >
        {this.capitalize(fill)}
      </li>
    ));

    return (
      <div className="fills">
        <h3>Fills</h3>
        {/* <button onClick={() => this.search()}>Find Fills</button>
        <ul className="fills__list">{fills}</ul> */}
        <ul className="fills__list">{preFills}</ul>
      </div>
    );
  }
}
