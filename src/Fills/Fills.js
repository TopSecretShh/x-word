import React from "react";
import "./Fills.css";

export default class Fills extends React.Component {
  state = {
    fills: [],
  };

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // search = () => {
  //   let word = this.props.word;
  //   fetch(`https://api.datamuse.com/words?sp=${word}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let words = data.map((word) => (word.score > 100 ? word.word : ""));
  //       this.setState({
  //         fills: words,
  //       });
  //     });
  // };

  render() {
    // let fills = this.state.fills.map((fill, i) => (
    //   <li
    //     key={i}
    //     className="fills__list--item"
    //     onClick={() => this.props.fillInWord(fill, this.props.selectedAnswer)}
    //   >
    //     {this.capitalize(fill)}
    //   </li>
    // ));

    let preFills = this.props.fills.map((fill, i) => (
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
