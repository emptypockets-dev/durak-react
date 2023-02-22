import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { motion } from "framer-motion";

export default function DiscardPile() {
  const discardPile = DurakMachineContext.useSelector(
    (state) => state.context.discardPile
  );

  useEffect(() => {
    // console.log({ discardPile });
  }, [discardPile]);

  return (
    <motion.div layout>
      {discardPile.length > 0 && (
        <motion.ul className="flex relative -rotate-6">
          {discardPile.map((card, index) => {
            const skewAmount = Math.floor(Math.random() * 2) + 1; // generate a random skew amount between 1 and 3 degrees
            const isNegative = Math.random() < 0.5; // randomly choose whether skew should be negative
            const skewValue = isNegative ? -skewAmount : skewAmount; // use negative skew value if isNegative is
            console.log("discard pile", card);
            return (
              <motion.li key={index} className="absolute" layoutId={card.id}>
                <motion.div
                  style={{
                    transform: `rotate(${skewValue}deg)`,
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-red-500"
                >
                  <PlayingCardBack />
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </motion.div>
  );
}
