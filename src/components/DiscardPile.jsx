import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscardPile() {
  const discardPile = DurakMachineContext.useSelector(
    (state) => state.context.discardPile
  );

  function randomNum() {
    return Math.floor(Math.random() * 20) - 5;
  }

  useEffect(() => {
    // console.log({ discardPile });
  }, [discardPile]);

  return (
    <AnimatePresence>
      {discardPile.length > 0 && (
        <ul className="flex relative -rotate-6">
          {discardPile.map((card, index) => {
            const skewAmount = Math.floor(Math.random() * 2) + 1; // generate a random skew amount between 1 and 3 degrees
            const isNegative = Math.random() < 0.5; // randomly choose whether skew should be negative
            const skewValue = isNegative ? -skewAmount : skewAmount; // use negative skew value if isNegative is
            console.log("discard pile", card);
            return (
              <li key={index} layout="position">
                <div
                  style={{
                    transform: `rotate(${skewValue * randomNum()}deg)`,
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-red-500"
                >
                  <PlayingCardBack />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </AnimatePresence>
  );
}
