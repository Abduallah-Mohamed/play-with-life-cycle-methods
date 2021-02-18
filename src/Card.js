import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    //   transform: translate(20px, 50px) rotate(90deg)
    // ! Put those vars in constructor to prevent them from rendering for each card
    const deg = Math.random() * 90 - 45;
    const xPos = Math.random() * 45 - 22;
    const yPos = Math.random() * 45 - 22;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${deg}deg)`;
  }

  render() {
    return (
      <img
        style={{ transform: this._transform }}
        className="Card"
        src={this.props.image}
        alt={this.props.name}
      />
    );
  }
}

export default Card;
