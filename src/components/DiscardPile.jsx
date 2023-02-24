import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscardPile() {
  const [state, send] = DurakMachineContext.useActor();
  const discardPile = DurakMachineContext.useSelector(
    (state) => state.context.discardPile
  );

  useEffect(() => {
    console.log("the cards in the component discard pile", discardPile);
  }, [discardPile]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "240px",
        right: "0",
        width: "165px",
        height: "200px",
      }}
    >
      {discardPile.length > 0 && (
        <motion.ul>
          {discardPile.map((card, index) => {
            return (
              <motion.li
                layout
                key={index}
                layoutId={card.id}
                style={{ position: "absolute" }}
              >
                <PlayingCardBack />
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </motion.div>
  );
}
