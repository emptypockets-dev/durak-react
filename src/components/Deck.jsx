import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCardBack from "./PlayingCardBack";
import PlayingCard from "./PlayingCard";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <motion.div style={{ position: "absolute", top: "50px", right: "150px" }}>
      {trumpCard?.suit && (
        <motion.div
          style={{
            position: "absolute",
            transform: "rotate(-93deg) translateY(-45px) translateX(5px)",
          }}
        >
          {deck.length > 0 && <PlayingCard card={trumpCard} />}
        </motion.div>
      )}
      <motion.ul>
        <AnimatePresence>
          {deck.map((card, index) => {
            return (
              <motion.li
                layout="position"
                layoutId={card.id}
                key={index}
                style={{
                  position: "absolute",
                }}
              >
                <PlayingCardBack />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {deck.length === 0 && (
        <span>{setTrumpIcon(trumpCard)}</span>
        // <span className="text-white text-2xl absolute top-16 left-11 z-1"></span>
      )}
    </motion.div>
  );
}
