import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const playingField = DurakMachineContext.useSelector(
    (state) => state.context.playingField
  );

  function randomNum() {
    return Math.floor(Math.random() * 20) - 5;
  }

  // useEffect(() => {
  //   console.log(playingField);
  //   console.log(state);
  // }, [playingField]);

  return (
    <motion.div
      style={{
        width: "50%",
        height: "300px",
        display: "flex",
      }}
    >
      {playingField.length > 0 && (
        <ul
          style={{
            display: "flex",
            transform: "translateY(50px)",
          }}
        >
          {playingField.map((cardPair, index) => (
            <motion.li
              key={index}
              style={{ position: "relative", perspective: "1000px" }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  transition={{ duration: 0.5 }}
                  initial={{ scale: 1.35 }}
                  animate={{ scale: 1 }}
                  layoutId={cardPair.attack.id}
                >
                  <PlayingCard card={cardPair.attack} />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                {cardPair.defend && (
                  <motion.div
                    transition={{ duration: 0.5 }}
                    layout
                    initial={{ scale: 1.35 }}
                    animate={{ scale: 1 }}
                    style={{ position: "absolute", top: "50px" }}
                    layoutId={cardPair.defend.id}
                  >
                    <PlayingCard card={cardPair.defend} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
