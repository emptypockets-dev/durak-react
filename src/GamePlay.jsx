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

export default function GamePlay() {
  const [state, send] = DurakMachineContext.useActor();
  const winner = DurakMachineContext.useSelector(
    (state) => state.context.winner
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Layout>
      {winner ? (
        <div className="h-screen flex place-content-center place-items-center">
          <h1 className="text-white text-6xl ">
            {winner === "human" ? "You win!" : "You lose."}
          </h1>
        </div>
      ) : (
        <>
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
            <div className=" text-white w-28 h-40 flex flex-col justify-between -translate-y-16 -translate-x-6">
              <div>
                <Deck />
              </div>
              <div className="">
                <DiscardPile />
              </div>
            </div>
          </div>
          <div className="">
            <GameInstruction />
            <PlayerHand />
          </div>
          {/* <div className="bg-orange-200 w-fit">hat</div> */}
          {/* <div className="bg-orange-100 w-fit">settings</div> */}
        </>
      )}
    </Layout>
  );
}
