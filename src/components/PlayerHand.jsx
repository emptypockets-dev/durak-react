import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import { motion, useTransform, AnimatePresence } from "framer-motion";
import { LayoutGroup } from "framer-motion";

export default function PlayerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
  const playingField = DurakMachineContext.useSelector(
    (state) => state.context.playingField
  );

  const playerHand = hands[0];

  function handleClick(card) {
    console.log(card);
    send({ type: "SELECT_CARD", card });
  }

  function handleDone() {
    send({ type: "DONE_ATTACKING" });
  }

  function cannotDefend() {
    console.log("cannot defend clicked");
    send({ type: "CANNOT_DEFEND" });
  }

  return (
    <div className="">
      {hands.length > 0 && (
        <ul style={{ display: "flex", maxWidth: "350px" }}>
          <AnimatePresence mode="popLayout">
            {playerHand.map((card, index) => (
              <motion.li
                layout="position"
                drag
                dragSnapToOrigin
                dragElastic={0.2}
                whileDrag={{ scale: 1.2 }}
                key={card.id}
                layoutId={card.id}
                transition={{
                  duration: 0.5,

                  delay: 0.1 * index,
                }}
                style={{
                  width: "1px",
                  maxWidth: "112px",
                  maxHeight: "160px",
                  flexGrow: 1,
                }}
              >
                <motion.div>
                  <PlayingCard
                    card={card}
                    handleClick={handleClick}
                    isFlipped={false}
                  />
                </motion.div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
      {state.value != "idle" && (
        <div style={{ display: "flex" }}>
          {state.matches("humanTurn.attacking") ||
            (state.matches("humanTurn.computerDefeated") &&
              playingField.length > 0 && (
                <button
                  onClick={handleDone}
                  className="text-sm text-white font-semibold mt-4 border border-white p-1 px-3 hover:bg-white hover:text-black"
                >
                  DONE
                </button>
              ))}
          {state.matches("humanTurn.defending") && (
            <button
              onClick={cannotDefend}
              className="text-sm text-white font-semibold mt-4 border border-white p-1 px-3 hover:bg-white hover:text-black mr-4"
            >
              TAKE CARDS
            </button>
          )}
        </div>
      )}
    </div>
  );
}
