import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCardBack from "./PlayingCardBack";
import PlayingCard from "./PlayingCard";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GiHearts, GiDiamonds, GiSpades, GiClubs } from "react-icons/gi";

export default function Deck() {
  const [state, send] = DurakMachineContext.useActor();
  const deck = DurakMachineContext.useSelector((state) => state.context.deck);
  const deckLength = DurakMachineContext.useSelector(
    (state) => state.context.deck.length
  );
  const trumpCard = DurakMachineContext.useSelector(
    (state) => state.context.trumpCard
  );

  function setTrumpIcon(trumpCard) {
    let icon;
    switch (trumpCard.suit) {
      case "hearts":
        icon = <GiHearts size={40} />;
        break;
      case "diamonds":
        icon = <GiDiamonds size={40} />;
        break;
      case "spades":
        icon = <GiSpades size={40} />;
        break;
      case "clubs":
        icon = <GiClubs size={40} />;
        break;
      default:
        break;
    }
    return <div className="text-yellow-600">{icon}</div>;
  }

  function randomRotation() {
    var randomNumber =
      Math.round(Math.random() * 5) * Math.sign(Math.random() - 0.5);
    return randomNumber;
  }

  // const [deckLength, setDeckLength] = useState(() => deck.length);

  // useEffect(() => {
  //   setDeckLength(deck.length);
  // }, deck);

  // const cardsStack = Array(deck.length).fill(null);

  return (
    <motion.div style={{ position: "absolute", top: "175px", right: "175px" }}>
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
        <AnimatePresence mode="popLayout">
          {deck.map((card, index) => {
            return (
              <motion.li
                layout="position"
                layoutId={card.id}
                key={card.id}
                style={{
                  position: "absolute",
                  boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.04)",
                }}
              >
                <PlayingCardBack />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {deck.length === 0 && (
        <div className="absolute translate-x-9 translate-y-14">
          {setTrumpIcon(trumpCard)}
        </div>
      )}
    </motion.div>
  );
}
