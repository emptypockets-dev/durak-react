import bg from "../assets/wood-bg.jpg";
import { DurakMachineContext } from "../providers/MachineContextProvider";

export default function Layout({ children }) {
  const [state, send] = DurakMachineContext.useActor();

  function handleDoubleClick() {
    console.log("double click, send DONE_ATTACKING");
    send({ type: "DONE_ATTACKING" });
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="p-5 select-none h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  );
}
