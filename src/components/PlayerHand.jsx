import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import { motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";

export default function PlayerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
  const playerHand = hands[0];

  useEffect(() => {
    // console.log(state);
  }, [state]);

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
    <div>
      {hands.length > 0 && (
        <ul className="flex">
          {playerHand.map((card, index) => (
            <motion.li
              key={card.id}
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, zIndex: 999 }}
            >
              <PlayingCard card={card} handleClick={handleClick} />
            </motion.li>
          ))}
        </ul>
      )}
      <button
        onClick={cannotDefend}
        className="text-sm text-white mt-4 border border-white p-1 px-3 hover:bg-white hover:text-black"
      >
        Cannot Defend
      </button>
    </div>
  );
}
