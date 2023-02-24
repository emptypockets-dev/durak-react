import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCardBack from "./PlayingCardBack";
import PlayingCard from "./PlayingCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiHearts, GiDiamonds, GiSpades, GiClubs } from "react-icons/gi";

export default function Deck() {
  const deck = DurakMachineContext.useSelector((state) => state.context.deck);
  const deckLength = DurakMachineContext.useSelector(
    (state) => state.context.deck.length
  );
  const trumpCard = DurakMachineContext.useSelector(
    (state) => state.context.trumpCard
  );

  function setTrumpIcon(trumpCard) {
    let icon;
    let iconColor;
    switch (trumpCard.suit) {
      case "hearts":
        icon = <GiHearts />;

        break;
      case "diamonds":
        icon = <GiDiamonds />;

        break;
      case "spades":
        icon = <GiSpades />;

        break;
      case "clubs":
        icon = <GiClubs />;

        break;
      default:
        break;
    }
    return <div className="text-yellow-600">{icon}</div>;
  }

  // const [deckLength, setDeckLength] = useState(() => deck.length);

  // useEffect(() => {
  //   setDeckLength(deck.length);
  // }, deck);

  // const cardsStack = Array(deck.length).fill(null);

  return (
    <div style={{ position: "absolute", top: "50px", right: "50px" }}>
      {trumpCard?.suit && (
        <div
          style={{
            position: "asbsolute",
            transform: "rotate(-90deg) translateY(-50px)",
          }}
        >
          {deck.length > 0 && <PlayingCard card={trumpCard} />}
        </div>
      )}
      <ul>
        {deck.map((card, index) => {
          return (
            <motion.li
              layout="position"
              key={index}
              style={{ position: "absolute", top: "0" }}
              layoutId={card.id}
            >
              <PlayingCardBack />
            </motion.li>
          );
        })}
      </ul>
      {deck.length === 0 && (
        <span>{setTrumpIcon(trumpCard)}</span>
        // <span className="text-white text-2xl absolute top-16 left-11 z-1"></span>
      )}
    </div>
  );
}
