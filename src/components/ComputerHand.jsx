import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";
import { motion } from "framer-motion";

export default function ComputerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
  const computerHand = hands[1];

  return (
    <motion.div className="h-48">
      {hands.length > 0 && (
        <motion.ul className="flex mb-7">
          {computerHand.map((card, index) => (
            <motion.li layoutId={card.id} key={`${card.suit} - ${card.value}`}>
              <PlayingCardBack />
              {/* <div className="" layoutId={card.id}>
                <PlayingCard card={card} />
              </div> */}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
