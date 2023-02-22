import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const playingField = DurakMachineContext.useSelector(
    (state) => state.context.playingField
  );

  // useEffect(() => {
  //   console.log(playingField);
  //   console.log(state);
  // }, [playingField]);

  return (
    <AnimatePresence>
      <motion.div layout>
        {playingField.length > 0 && (
          <motion.ul
            className="flex"
            layout="position"
            transition={{ duration: 0.3 }}
          >
            {playingField.map((cardPair, index) => (
              <div key={index} className="flex flex-col">
                <motion.div className="rotate-2">
                  <PlayingCard card={cardPair.attack} />
                </motion.div>
                {cardPair.defend && (
                  <motion.div className="-translate-y-24 rotate-3">
                    <PlayingCard card={cardPair.defend} />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
