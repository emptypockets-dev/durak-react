import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";

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
            <li
              key={card.id}
              style={{
                transform: `translateX(calc(-40px * ${index})) rotate(-1deg)`,
              }}
            >
              <PlayingCard card={card} handleClick={handleClick} />
            </li>
          ))}
        </ul>
      )}
      <button onClick={cannotDefend} className="text-white">
        Cannot Defend
      </button>
    </div>
  );
}
