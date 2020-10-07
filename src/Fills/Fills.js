import React from "react";
import "./Fills.css";

// TODO should be functional component

export default class Fills extends React.Component {
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    let preFills = this.props.fills.map((fill, i) => (
      <li
        key={i}
        className="fills__list--item"
        onClick={() => this.props.fillInWord(fill)}
      >
        {this.capitalize(fill)}
      </li>
    ));

    return (
      <div className="fills">
        <h3>Fills</h3>
        <ul className="fills__list">{preFills}</ul>
      </div>
    );
  }
}
