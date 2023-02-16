import { durakMachine } from "../state/machines/durak.machine";
import { createActorContext } from "@xstate/react";

export const DurakMachineContext = createActorContext(durakMachine);

export default function MachineContextProvider({ children }) {
  return (
    <DurakMachineContext.Provider>{children}</DurakMachineContext.Provider>
  );
}
