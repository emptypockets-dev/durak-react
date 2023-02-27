import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function ComputerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
  const computerHand = hands[1];

  return (
    <div className="h-40">
      {hands.length > 0 && (
        <motion.ul style={{ display: "flex" }}>
          <AnimatePresence mode="popLayout">
            {computerHand.map((card, index) => (
              <motion.li
                layout="position"
                layoutId={card.id}
                key={card.id}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: 0.1 * index,
                }}
                style={{
                  position: "absolute",
                  left: `${70 * index}px`,
                  width: "112px",
                  maxWidth: "112px",
                  height: "160px",
                  maxHeight: "160px",
                  top: "20px",
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
