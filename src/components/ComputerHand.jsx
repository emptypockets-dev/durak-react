import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { motion } from "framer-motion";

export default function ComputerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
  const computerHand = hands[1];

  return (
    <div>
      {hands.length > 0 && (
        <motion.ul style={{ display: "flex", width: "100%" }}>
          {computerHand.map((card, index) => (
            <motion.li layoutId={card.id} key={`${card.suit} - ${card.value}`}>
              <motion.div
                layout="position"
                animate={{ x: -40 * index, position: "relative" }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  layout: {},
                }}
              >
                <PlayingCardBack />
              </motion.div>
              {/* left: `${-50 * index}px` */}
              {/* <div className="" layoutId={card.id}>
                <PlayingCard card={card} />
              </div> */}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
