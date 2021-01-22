/** Render a card component 
 * 
 * Prop:
 * - card: object like: 
 * {
      "image": "https://deckofcardsapi.com/static/img/KH.png",
      "value": "KING",
      "suit": "HEARTS",
      "code": "KH"
    }
 * 
 * CardDrawer -> Card
*/
function Card({ card }) {
  return (
    <img className="Card"
      alt={`${card.value} of ${card.suit}`}
      src={card.image} />
  )
}

export default Card;