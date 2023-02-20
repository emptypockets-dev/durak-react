import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";

export default function ComputerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const hands = DurakMachineContext.useSelector((state) => state.context.hands);
  const computerHand = hands[1];

  return (
    <div>
      {hands.length > 0 && (
        <ul className="flex mb-7">
          {computerHand.map((card, index) => (
            <li
              style={{
                transform: `translateX(calc(-40px * ${index})) rotate(-1deg)`,
              }}
              key={`${card.suit} - ${card.value}`}
            >
              <PlayingCardBack />
              <PlayingCard card={card} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
