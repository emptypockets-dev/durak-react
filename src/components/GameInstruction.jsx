import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";

export default function GameInstruction() {
  const [state, send] = DurakMachineContext.useActor();
  const currentState = DurakMachineContext.useSelector((state) => state.value);
  const currentInstruction = DurakMachineContext.useSelector(
    (state) => state.context.currentInstruction
  );

  // useEffect(() => {
  //   console.log(state);
  //   console.log({ currentInstruction });
  // }, [state]);

  return (
    <p className="text-white text-lg">
      {currentState}, {currentInstruction}
    </p>
  );
}
