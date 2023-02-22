import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";

export default function GameInstruction() {
  const [state, send] = DurakMachineContext.useActor();
  const currentState = DurakMachineContext.useSelector((state) => state.value);
  const currentInstruction = DurakMachineContext.useSelector(
    (state) => state.context.currentInstruction
  );

  useEffect(() => {
    // console.log(state);
    // console.log({ currentInstruction });
  }, [state]);

  return (
    <>
      <p className="text-white text-lg mb-3 font-semibold">
        {currentInstruction}
      </p>
      {/* <p className="text-white">computer:{state?.value?.computerTurn}</p> */}
      {/* <p className="text-white">human: {state?.value?.humanTurn}</p> */}
    </>
  );
}
