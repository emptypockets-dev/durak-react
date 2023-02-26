import { useContext, useEffect, useState } from "react";
import Deck from "./components/Deck";
import StartMenu from "./components/StartMenu";
import PlayerHand from "./components/PlayerHand";
import ComputerHand from "./components/ComputerHand";
import Layout from "./components/Layout";
import GameInstruction from "./components/GameInstruction";
import PlayingField from "./components/PlayingField";
import DiscardPile from "./components/DiscardPile";
import { DurakMachineContext } from "./providers/MachineContextProvider";
import { LayoutGroupContext, motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";

export default function GamePlay() {
  const winner = DurakMachineContext.useSelector(
    (state) => state.context.winner
  );

  return (
    <Layout>
      {winner ? (
        <div className="h-screen flex place-content-center place-items-center">
          <h1 className="bg-gold-gradient text-gold-gradient bg-clip-text text-12xl leading-none text-9xl uppercase font-semibold">
            {winner === "human" ? "You win!" : "You lose."}
          </h1>
        </div>
      ) : (
        <>
          <StartMenu />

          <ComputerHand />
          <PlayingField />
          <DiscardPile />
          <Deck />
          <GameInstruction />
          <PlayerHand />

          {/* </LayoutGroup> */}
          {/* <div className="bg-orange-200 w-fit">hat</div> */}
          {/* <div className="bg-orange-100 w-fit">settings</div> */}
        </>
      )}
    </Layout>
  );
}
