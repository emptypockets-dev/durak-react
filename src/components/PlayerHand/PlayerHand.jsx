import React, { useState, useEffect, useContext } from "react";
import Deck from "../Deck";
import useDeck from "../Deck/useDeck";
import PlayingCard from "../PlayingCard";
import PlayingCardBack from "../PlayingCard/PlayingCardBack";

import { GlobalContext } from "../../machines/the-game-machine";

const PlayerHand = ({ player, showCards }) => {
  const { state, send } = useContext(GlobalContext);
  const currentPlayer = state.context.players[player];

  function attackWithCard(card) {
    console.log(card);
    // add a card to the playing field
    send({ type: "ATTACK", card });
    // remove a card from hand
  }

  return (
    <div>
      <h2>{currentPlayer.name}'s hand</h2>

      {showCards ? (
        <ul className="flex mb-8 mt-2">
          {currentPlayer.hand?.map((card, index) => (
            <li key={index}>
              <PlayingCard
                key={index}
                card={card}
                handleClick={attackWithCard}
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex mb-8 mt-2">
          {currentPlayer.hand?.map((card, index) => (
            <li key={index}>
              <PlayingCardBack />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerHand;

// const PlayerHand = ({ addCardToField }) => {
//   const [hand, setHand] = useState([]);
//   const [deck, setDeck, generateDeck] = useDeck();

//   useEffect(() => {
//     generateDeck();
//   }, []);

//   function removeObject(array, objectToRemove) {
//     return array.filter(function (currentObject) {
//       return !(
//         currentObject.suit === objectToRemove.suit &&
//         currentObject.value === objectToRemove.value
//       );
//     });
//   }

//   const addCardToFieldAndRemove = (card) => {
//     addCardToField(card);
//     // remove card from hand
//     const newHand = removeObject(hand, card);
//     setHand(newHand);
//   };

//   const generateHand = () => {
//     let newDeck = [...deck];
//     let newHand = [];
//     while (newHand.length < 6 && newDeck.length > 0) {
//       let randomIndex = Math.floor(Math.random() * newDeck.length);
//       newHand.push(newDeck[randomIndex]);
//       newDeck.splice(randomIndex, 1);
//     }
//     setHand(newHand);
//     setDeck(newDeck);
//   };

//   return (
//     <div className="absolute bottom-10 pl-44 w-fit">
//       <div className="absolute left-0 bottom-0">
//         <Deck count={deck.length} />
//       </div>
//       <button
//         className="bg-black text-white p-3 px-5 my-4"
//         onClick={generateHand}
//       >
//         Deal Hand
//       </button>
//       <div className="flex flex-wrap">
//         {hand.length > 0 &&
//           hand.map((card, index) => (
//             <PlayingCard
//               key={index}
//               card={card}
//               handleClick={addCardToFieldAndRemove}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default PlayerHand;
