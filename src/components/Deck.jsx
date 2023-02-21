import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCardBack from "./PlayingCardBack";
import PlayingCard from "./PlayingCard";
import { useEffect, useState } from "react";

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

  const cardsStack = Array(deck.length).fill(null);

  return (
    <div className="relative">
      {trumpCard?.suit && (
        <div className="absolute -rotate-90 -translate-x-10">
          {cardsStack.length > 0 && <PlayingCard card={trumpCard} />}
        </div>
      )}
      <ul className="relative">
        {cardsStack.map((_, index) => {
          const skewAmount = Math.floor(Math.random() * 2) + 1; // generate a random skew amount between 1 and 3 degrees
          const isNegative = Math.random() < 0.5; // randomly choose whether skew should be negative
          const skewValue = isNegative ? -skewAmount : skewAmount; // use negative skew value if isNegative is true
          return (
            <li key={index} className="absolute">
              <div
                style={{
                  transform: `rotate(${skewValue}deg)`,
                }}
                className="absolute top-0 left-0 w-full h-full bg-red-500"
              >
                <PlayingCardBack />
              </div>
            </li>
          );
        })}
      </ul>
      <span className="absolute -top-2 -right-2 block bg-black/60 text-white rounded-full text-sm p-1.5">
        {deckLength}
      </span>
    </div>
  );
}