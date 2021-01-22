import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "./Card";

const GET_DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";

/** Render a card component
 * 
 * State:
 * - cards: Array of all the card codes 
 *    ["KH", "8S", ...]
 * - getNewCardUrl: URL to get new cards from 
 *    specific deck of cards
 * 
 * App -> CardDrawer -> Card
 */
function CardDrawer() {
  const [cards, setCards] = useState([]);
  const [getNewCardUrl, setGetNewCardUrl] = useState(null);

  /** gets new deck upon page load */
  useEffect(function newDeckOnMount() {
    async function getNewDeck() {
      let response = await axios.get(GET_DECK_URL);
      let deckId = response.data.deck_id;
      setGetNewCardUrl(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
    }
    getNewDeck();
  }, []);

  /** gets next card on click */
  async function handleClick() {
    if (cards.length === 52) {
      alert("Error, no more cards");
      return;
    }
    let response = await axios.get(getNewCardUrl);
    let cardCode = response.data.cards[0].code;
    setCards(card => [...card, cardCode]);
    // NOTE: we'll change state here to trigger useEffect
  }

  let cardList = cards.map(c => <Card code={c} />);

  return (
    <div className="CardDrawer">
      <div>
        <button className="CardDrawer-button" onClick={handleClick}>
          Gimme a card!
        </button>
      </div>
      {cardList}
    </div>
  )
}

export default CardDrawer;