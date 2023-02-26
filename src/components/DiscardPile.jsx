import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscardPile() {
  // const [state, send] = DurakMachineContext.useActor();
  const discardPile = DurakMachineContext.useSelector(
    (state) => state.context.discardPile
  );

  useEffect(() => {
    console.log("the cards in the component discard pile", discardPile);
  }, [discardPile]);

  function randomRotation() {
    var randomNumber =
      Math.round(Math.random() * 5) * Math.sign(Math.random() - 0.5);
    return randomNumber;
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "360px",
        right: "0px",
        width: "165px",
        height: "200px",
      }}
    >
      {discardPile.length > 0 && (
        <motion.ul>
          <AnimatePresence mode="popLayout">
            {discardPile.map((card, index) => {
              return (
                <motion.li
                  layout
                  key={index}
                  layoutId={card.id}
                  style={{ position: "absolute", rotate: randomRotation() }}
                >
                  <PlayingCardBack />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </motion.div>
  );
}
