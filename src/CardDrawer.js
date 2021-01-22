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

  function handleClick() {
    async function getNextCard() {
      let response = await axios.get(getNewCardUrl);
      let cardCode = response.data.cards[0].code;
      setCards(card => [...card, cardCode]);
    }
    getNextCard();
  }

  let cardList = cards.map(c => <Card code={c} />);

  return (
    <div className="CardDrawer">
      <button className="CardDrawer-button" onClick={handleClick}>
        Gimme a card!
      </button>
      {cardList}
    </div>
  )
}

export default CardDrawer;