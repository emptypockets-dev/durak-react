import { useContext } from "react";
import PlayingCardBack from "../PlayingCard/PlayingCardBack";
import { GlobalContext } from "../../machines/the-game-machine";

const Deck = () => {
  const { state, send } = useContext(GlobalContext);

  return (
    <>
      <div className="relative w-fit mb-10">
        <PlayingCardBack />
        <h2 className="bg-white/75 p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md font-bold">
          count: {state.context.deck.length}
        </h2>
      </div>
    </>
  );
};

export default Deck;
