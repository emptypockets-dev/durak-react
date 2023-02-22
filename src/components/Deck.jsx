import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCardBack from "./PlayingCardBack";
import PlayingCard from "./PlayingCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Deck() {
  const deck = DurakMachineContext.useSelector((state) => state.context.deck);
  const deckLength = DurakMachineContext.useSelector(
    (state) => state.context.deck.length
  );
  const trumpCard = DurakMachineContext.useSelector(
    (state) => state.context.trumpCard
  );

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
            <li key={index} style={{ position: "absolute", top: "0" }}>
              <motion.div>
                <PlayingCardBack />
              </motion.div>
            </li>
          );
        })}
      </ul>
      {/* <span className="absolute -top-2 -right-2 block bg-black/60 text-white rounded-full text-sm p-1.5">
        {deckLength}
      </span> */}
    </div>
  );
}
