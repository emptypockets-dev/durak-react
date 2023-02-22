import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import { motion, useTransform } from "framer-motion";
import { LayoutGroup } from "framer-motion";

export default function PlayerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
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
    <LayoutGroup>
      {hands.length > 0 && (
        <motion.ul className="flex w-2/3" layout>
          {playerHand.map((card, index) => (
            <motion.li
              key={card.id}
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, zIndex: 9999 }}
              className="relative"
            >
              <PlayingCard card={card} handleClick={handleClick} />
            </motion.li>
          ))}
        </motion.ul>
      )}
      <div className="flex justify-center">
        <button
          onClick={cannotDefend}
          className="text-sm text-white mt-4 border border-white p-1 px-3 hover:bg-white hover:text-black mr-4"
        >
          TAKE CARDS
        </button>

        <button
          onClick={handleDone}
          className="text-sm text-white mt-4 border border-white p-1 px-3 hover:bg-white hover:text-black"
        >
          DONE
        </button>
      </div>
    </LayoutGroup>
  );
}
