import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

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
  const [deck, setDeck] = useState(null);
  const [fetchCard, setFetchCard] = useState(false);

  //
  /** gets new deck upon page load */
  useEffect(function newDeckOnMount() {
    async function getNewDeck() {
      let response = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(response.data);
    }
    getNewDeck();
  }, []);

  // TODO: add unique key - use card code
  /** gets next card on click after re-render */
  useEffect(function newCardOnClick() {
    async function getNewCard() {
      setFetchCard(false);
      // TODO: use api as truth and look for # remaining if 0 then alert
      if (cards.length === 52) {
        alert("Error, no more cards");
        return;
      }
      let response = await axios.get(
        `${BASE_URL}/${deck.deck_id}/draw/?count=1`);
      // TODO: grab whole image and pass that to card
      setCards(card => [...card, response.data.cards[0]]);
    }
    if (fetchCard) getNewCard();
  }, [fetchCard])

  /** add doc string */
  function handleClick() {
    setFetchCard(true);
  }

  let cardList = cards.map(c => <Card card={c} />);

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