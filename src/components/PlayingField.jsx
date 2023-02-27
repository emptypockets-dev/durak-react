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
            <motion.li key={index} style={{ position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  layout="position"
                  transition={{ duration: 0.25 }}
                  layoutId={cardPair.attack.id}
                >
                  <PlayingCard card={cardPair.attack} />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {cardPair.defend && (
                  <motion.div
                    transition={{ duration: 0.25 }}
                    layout="position"
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
