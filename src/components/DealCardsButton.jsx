import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../machines/the-game-machine";

function DealCardsButton() {
  const { send } = useContext(GlobalContext);

  useEffect(() => {
    send("DECK_SHUFFLED");
    send("CARDS_DEALT");
  }, []);

  return (
    <button
      onClick={() => {
        send("DECK_SHUFFLED");
        send("CARDS_DEALT");
      }}
    >
      Deal Cards
    </button>
  );
}

export default DealCardsButton;
