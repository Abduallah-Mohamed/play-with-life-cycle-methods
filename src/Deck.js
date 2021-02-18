import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // the deck key will carry the image url
      deck: null,
      drawn: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    // console.log(response);
    // console.log(response.data);
    this.setState({
      deck: response.data,
    });
  }

  async handleClick() {
    let deckId = this.state.deck.deck_id;

    // make request using deck id
    try {
      let cardURL = `${API_BASE_URL}/${deckId}/draw/`;
      let res = await axios.get(cardURL);

      // set state using new card info getting from api
      if (!res.data.success) throw new Error("No cards left");
      let cardInfo = res.data.cards[0];
      this.setState((curState) => ({
        drawn: [
          ...curState.drawn,
          {
            id: cardInfo.code,
            image: cardInfo.image,
            name: ` ${cardInfo.value} of ${cardInfo.suit}`,
          },
        ],
      }));
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const cards = this.state.drawn.map((card) => (
      <Card name={card.name} image={card.image} key={card.id} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-header">^ Card Dealer ^</h1>
        <h2 className="Deck-header subtitle">Card Demo with React :)</h2>
        <button className="Deck-btn" onClick={this.handleClick}>
          Get Cards!
        </button>
        <div className="Deck-CardArea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
