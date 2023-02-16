import Discard from "../Discard";
import PlayingCard from "../PlayingCard";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../machines/the-game-machine";

const PlayingField = () => {
  const { state, send } = useContext(GlobalContext);
  let currentTurn =
    state.context.currentTurn === 0
      ? "player 1 turn to attack"
      : "player 2 turn to attack";
  let playingField = state.context.playingField;

  return (
    <>
      <p>{currentTurn}</p>
      <div className="flex flex-wrap w-full justify-center items-center h-64">
        <div className="flex">
          {playingField.length > 0 &&
            playingField.map((card, index) => (
              <PlayingCard key={index} card={card} />
            ))}
        </div>
      </div>
    </>
  );
};

export default PlayingField;
