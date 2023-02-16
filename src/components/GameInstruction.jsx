import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";

export default function GameInstruction() {
  const [state, send] = DurakMachineContext.useActor();
  const currentState = DurakMachineContext.useSelector((state) => state.value);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <p className="text-white text-lg">{currentState}</p>;
}
