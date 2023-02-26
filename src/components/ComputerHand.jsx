import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { AnimatePresence, motion } from "framer-motion";

export default function ComputerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
  const computerHand = hands[1];

  return (
    <div>
      {hands.length > 0 && (
        <motion.ul style={{ display: "flex", width: "100%" }}>
          <AnimatePresence mode="popLayout">
            {computerHand.map((card, index) => (
              <motion.li
                layout
                layoutId={card.id}
                key={card.id}
                // animate={{
                //   x: -40 * index,
                // }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <PlayingCardBack />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
