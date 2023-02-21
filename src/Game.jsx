import MachineContextProvider from "./providers/MachineContextProvider";
import GamePlay from "./GamePlay";

function Game() {
  return (
    <MachineContextProvider>
      <GamePlay />
    </MachineContextProvider>
  );
}

export default Game;
