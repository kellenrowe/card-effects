import React, { useState, useEffect } from "react";

const GET_DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";
const GET_NEXT_CARD = "https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1";

/** add doc string */
function CardDrawer() {
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState(null);

  useEffect(function newDeckOnMount() {
    async function getNewDeck() {
      let response = await axios.get(GET_DECK_URL);
      setDeckId(response.data.deck_id);
    }
  })

  function handleClick() {
    async function getNextCard() {
      let response = await axios.get(GET_NEXT_CARD);
      setCards(card => [...cards, response.data.cards[0]])
     }
  }

  let cardList = cards.map(c => <Card card={c} />)

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