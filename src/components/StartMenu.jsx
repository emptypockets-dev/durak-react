import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";

export default function StartMenu() {
  const [state, send] = DurakMachineContext.useActor();

  useEffect(() => {
    handleStartGame();
  }, []);

  function handleStartGame() {
    send("START_GAME");
  }

  return (
    <div>
      {state.value === "preGame" && (
        <button className="bg-yellow-500 text-white" onClick={handleStartGame}>
          Start game
        </button>
      )}
    </div>
  );
}
