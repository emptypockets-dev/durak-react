import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscardPile() {
  const discardPile = DurakMachineContext.useSelector(
    (state) => state.context.discardPile
  );

  useEffect(() => {
    // console.log({ discardPile });
  }, [discardPile]);

  return (
    <div style={{ position: "absolute", top: "240px", right: "150px" }}>
      {discardPile.length > 0 && (
        <ul>
          {discardPile.map((card, index) => {
            return (
              <motion.li
                key={index}
                layoutId={card.id}
                style={{ position: "absolute", top: "0" }}
              >
                <PlayingCardBack />
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
