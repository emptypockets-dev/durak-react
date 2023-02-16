import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";

export default function PlayerHand() {
  const [state, send] = DurakMachineContext.useActor();
  const playingField = DurakMachineContext.useSelector(
    (state) => state.context.playingField
  );

  // useEffect(() => {
  //   console.log(playingField);
  //   console.log(state);
  // }, [playingField]);

  return (
    <div>
      {playingField.length > 0 && (
        <ul className="flex">
          {playingField.map((cardPair, index) => (
            <div key={index} className="flex flex-col">
              <div className="rotate-2">
                <PlayingCard card={cardPair.attack} />
              </div>
              {cardPair.defend && (
                <div className="-translate-y-24 rotate-3">
                  <PlayingCard card={cardPair.defend} />
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
