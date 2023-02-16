import { useContext, useEffect, useState } from "react";
import Deck from "./components/Deck";
import StartMenu from "./components/StartMenu";
import MachineContextProvider from "./providers/MachineContextProvider";
import PlayerHand from "./components/PlayerHand";
import ComputerHand from "./components/ComputerHand";
import Layout from "./components/Layout";
import GameInstruction from "./components/GameInstruction";
import PlayingField from "./components/PlayingField";

function Game() {
  return (
    <MachineContextProvider>
      <Layout>
        <StartMenu />
        <div className="">
          <ComputerHand />
        </div>
        {/* middle */}
        <div className="flex justify-between h-48">
          <div className="w-full">
            <PlayingField />
          </div>
          {/* right side */}
          <div className=" text-white w-28 flex flex-col justify-between">
            <div>
              <Deck />
            </div>
            <div className="bg-slate-900 h-12">discard</div>
          </div>
        </div>
        <div className="">
          <GameInstruction />
          <PlayerHand />
        </div>
        <div className="bg-orange-200 w-fit">hat</div>
        <div className="bg-orange-100 w-fit">settings</div>
      </Layout>
    </MachineContextProvider>
  );
}

export default Game;
