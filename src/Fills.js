import React from "react";

export default class Fills extends React.Component {
  state = {
    fills: [],
  };

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  search = () => {
    let word = this.props.word;
    console.log("fills word: ", word);
    fetch(`https://api.datamuse.com/words?sp=${word}`)
      .then((response) => response.json())
      .then((data) => {
        let words = data.map((word) => (word.score > 100 ? word.word : ""));
        this.setState({
          fills: words,
        });
      });
  };

  // TODO what if you could click on a fill and it actually filled in the cells with the letters!
  // TODO fills could be a scrollable div instead of a huge long list?
  render() {
    let fills = this.state.fills.map((fill, i) => (
      <li key={i}>{this.capitalize(fill)}</li>
    ));

    return (
      <div className="fills">
        <h3>Fills</h3>
        <button onClick={() => this.search()}>Find Fills</button>
        <ul className="fills">{fills}</ul>
      </div>
    );
  }
}
