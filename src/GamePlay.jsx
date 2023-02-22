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
import { motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";

export default function GamePlay() {
  const winner = DurakMachineContext.useSelector(
    (state) => state.context.winner
  );

  return (
    <Layout>
      {winner ? (
        <div className="h-screen flex place-content-center place-items-center">
          <h1 className="text-white text-6xl font-semibold">
            {winner === "human" ? "You win!" : "You lose."}
          </h1>
        </div>
      ) : (
        <>
          <StartMenu />
          {/* <LayoutGroup> */}
          <ComputerHand />

          {/* middle */}
          {/* <LayoutGroup> */}
          <motion.div className="flex justify-between h-48" layout>
            {/* <LayoutGroup> */}
            <motion.div className="w-full">
              <PlayingField />
            </motion.div>
            {/* right side */}
            <motion.div className=" text-white w-28 h-40 flex flex-col justify-between -translate-y-16 -translate-x-6">
              <Deck />
              <DiscardPile />
            </motion.div>
            {/* </LayoutGroup> */}
          </motion.div>
          {/* </LayoutGroup> */}

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
