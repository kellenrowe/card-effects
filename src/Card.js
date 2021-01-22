import React from "react";

const IMAGE_URL = "https://deckofcardsapi.com/static/img"


/** Render a card component 
 * 
 * Prop:
 * - code: Two letter code describing what the card is
 * 
 * CardDrawer -> Card
*/
function Card({ code }) {
  return (
    <img className="Card" src={`${IMAGE_URL}/${code}.png`} />
  )
}

export default Card;