import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCard from "./PlayingCard";
import PlayingCardBack from "./PlayingCardBack";

export default function DiscardPile() {
  const [state, send] = DurakMachineContext.useActor();
  const discardPile = DurakMachineContext.useSelector(
    (state) => state.context.discardPile
  );

  useEffect(() => {
    console.log({ discardPile });
    // console.log(state);
  }, [discardPile]);

  return (
    <div>
      {discardPile.length > 0 && (
        <ul className="flex relative -rotate-6">
          {discardPile.map((_, index) => {
            const skewAmount = Math.floor(Math.random() * 2) + 1; // generate a random skew amount between 1 and 3 degrees
            const isNegative = Math.random() < 0.5; // randomly choose whether skew should be negative
            const skewValue = isNegative ? -skewAmount : skewAmount; // use negative skew value if isNegative is true
            return (
              <li key={index} className="absolute">
                <div
                  style={{
                    transform: `rotate(${skewValue}deg)`,
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-red-500"
                >
                  <PlayingCardBack />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
