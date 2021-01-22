import { useState, useEffect } from "react";
import axios from "axios";

import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

/** Render a card component
 * 
 * State:
 * - cards: Array of all the card codes 
 *    ["KH", "8S", ...]
 * - deck: object that holds information regarding the deck
 *    {success, deck_id, shuffled, remaining}
 * - fetchCard: boolean describing whether this current 
 *    component should fetch a card
 * - isShuffling: boolean describing whether this current 
 *    component is shuffling the deck
 * 
 * App -> CardDrawer -> Card
 */

function CardDrawer() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState(null);
  const [fetchCard, setFetchCard] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  /** gets new deck upon page load */
  useEffect(function newDeckOnMount() {
    async function getNewDeck() {
      try {
        var response = await axios.get(`${BASE_URL}/new/shuffle/`);
        if(response.data.success === false) 
          throw new Error("The deck was not successfully created");
      } catch (err) {
        alert(`There has been an error: ${err}`);
        return;
      }
      setDeck(response.data);
    }
    getNewDeck();
  }, []);

  /** gets next card on click after re-render */
  useEffect(function newCardOnClick() {
    async function getNewCard() {
      setFetchCard(false);
      try {
        var response = await axios.get(
          `${BASE_URL}/${deck.deck_id}/draw/?count=1`);
      } catch (err) {
        alert(`There has been an error: ${err}`);
        return;
      }

      if (response.data.remaining === 0) {
        alert("Error, no more cards");
        return;
      }
      setCards(card => [...card, response.data.cards[0]]);
    }
    if (fetchCard) getNewCard();
  }, [fetchCard])

  /** shuffles the deck after re-render */
  useEffect(function shuffleDeckOnClick() {
    async function shuffleDeck() {
      setIsShuffling(false);
      try{
        let response = await axios.get(
          `${BASE_URL}/${deck.deck_id}/shuffle`);
        if (response.data.success === false) throw new Error(
          "The deck was not successfully shuffled"
        );
      } catch (err) {
        alert(`There has been an error: ${err}`);
        return;
      }
    }
    // SetTimeOut only here just to demonstrate the loading screen appears
    if (isShuffling) setTimeout(shuffleDeck, 1000);
  }, [isShuffling]);

  /** add doc string */
  function handleClick() {
    setFetchCard(true);
  }

  function handleShuffle() {
    setIsShuffling(true);
    setCards([]);
  }

  let cardList = cards.map(c => <Card key={c.code} card={c} />);

  let shuffleBtn = (cards.length !== 0) 
    ? <button className="CardDrawer-shuffle-button" onClick={handleShuffle}>
        Shuffle the deck!
      </button>
    : null;

  function renderPage() {
    return (isShuffling
      ? <div>The deck is shuffling, please wait</div>
      : <div>
        <div>
          <button className="CardDrawer-button" onClick={handleClick}>
            Gimme a card!
          </button>
        </div>
        {cardList}
        <div>
          {shuffleBtn}
        </div>
      </div>);
  }

  return (
    <div className="CardDrawer">
      <div>
        {renderPage()}
      </div>
    </div>
  )
}

export default CardDrawer;