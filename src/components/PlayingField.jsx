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
    // <AnimatePresence>
    <motion.div
      style={{
        width: "50%",
        height: "300px",
        display: "flex",
      }}
    >
      {playingField.length > 0 && (
        <motion.ul style={{ display: "flex", transform: "translateY(50px)" }}>
          {playingField.map((cardPair, index) => (
            <div key={index} style={{ position: "relative" }}>
              <motion.div layout layoutId={cardPair.attack.id}>
                <PlayingCard card={cardPair.attack} />
              </motion.div>
              {cardPair.defend && (
                <motion.div
                  layout="position"
                  animate={{ position: "absolute", top: "50px" }}
                  layoutId={cardPair.defend.id}
                >
                  <PlayingCard card={cardPair.defend} />
                </motion.div>
              )}
            </div>
          ))}
        </motion.ul>
      )}
    </motion.div>
    // </AnimatePresence>
  );
}
