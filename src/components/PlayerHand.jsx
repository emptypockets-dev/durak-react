import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";

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

  return (
    <div>
      {hands.length > 0 && (
        <ul className="flex">
          {playerHand.map((card, index) => (
            <li key={`${card.suit} - ${card.value}`}>
              <PlayingCard card={card} handleClick={handleClick} />
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleDone}>Done Attacking</button>
    </div>
  );
}
