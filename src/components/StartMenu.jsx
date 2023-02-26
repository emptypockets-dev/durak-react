import { useEffect } from "react";
import { DurakMachineContext } from "../providers/MachineContextProvider";
import PlayingCardBack from "./PlayingCardBack";
import { motion } from "framer-motion";

export default function StartMenu() {
  const [state, send] = DurakMachineContext.useActor();

  useEffect(() => {
    console.log(state.value);
    handleStartGame();
  }, []);

  function handleStartGame() {
    send("START_GAME");
  }

  const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };

  return (
    <>
      {state.value === "idle" && (
        <div>
          <div className="flex flex-col place-content-center place-items-start h-screen">
            <h1 className="bg-gold-gradient text-gold-gradient bg-clip-text text-12xl leading-none mb-4">
              <span className="-tracking-[.10em]">D</span>U
              <span className="tracking-[.07em]">R</span>AK
              <span className="block w-[672px] h-3 rounded-full bg-gold-gradient -translate-y-4 translate-x-2"></span>
            </h1>

            <button
              className="mb-5 bg-gold-gradient text-gold-gradient hover:bg-gold-gradient-reverse hover:text-gold-gradient-reverse bg-clip-text text-5xl uppercase translate-x-1.5"
              onClick={handleStartGame}
            >
              Single Player
            </button>
            <button
              className="mb-5 bg-yellow-900 text-gold-gradient bg-clip-text text-5xl uppercase translate-x-1.5"
              onClick={handleStartGame}
            >
              Multiplayer
            </button>
            <button
              className="mb-5 bg-yellow-900 text-gold-gradient bg-clip-text text-5xl uppercase translate-x-1.5"
              onClick={handleStartGame}
            >
              Tutorial
            </button>
            <button
              className="mb-5 bg-yellow-900 text-gold-gradient bg-clip-text text-5xl uppercase translate-x-1.5"
              onClick={handleStartGame}
            >
              Settings
            </button>
          </div>
          {/* wrapping cards */}
          <div>
            {/* card */}
            <motion.div
              transition={spring}
              drag
              dragSnapToOrigin
              dragElastic={0.2}
              whileDrag={{ scale: 1 }}
              style={{
                position: "absolute",
                top: -32,
                right: -82,
              }}
              initial={{ rotate: -20, x: 0 }}
              animate={{ x: 10 }}
            >
              <PlayingCardBack width="w-72" height="h-auto" />
            </motion.div>
          </div>

          {/* card */}
          <motion.div
            transition={spring}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            whileDrag={{ scale: 1 }}
            style={{
              position: "absolute",
              top: 150,
              right: -42,
            }}
            initial={{ rotate: -5, x: 0 }}
            animate={{ x: 20 }}
          >
            <PlayingCardBack width="w-72" height="h-auto" />
          </motion.div>

          {/* card */}
          <motion.div
            transition={spring}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            whileDrag={{ scale: 1 }}
            style={{
              position: "absolute",
              top: 250,
              right: -80,
            }}
            initial={{ rotate: -5, x: 0 }}
            animate={{ x: 30 }}
          >
            <PlayingCardBack width="w-72" height="h-auto" />
          </motion.div>

          {/* card */}
          <motion.div
            transition={spring}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            whileDrag={{ scale: 1 }}
            style={{
              position: "absolute",
              top: 400,
              right: -90,
            }}
            initial={{ rotate: -30, x: 0 }}
            animate={{ x: 30 }}
          >
            <PlayingCardBack width="w-72" height="h-auto" />
          </motion.div>

          {/* card */}
          <motion.div
            transition={spring}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            whileDrag={{ scale: 1 }}
            style={{
              position: "absolute",
              top: 500,
              right: -90,
            }}
            initial={{ rotate: 10, x: 0 }}
            animate={{ x: 30 }}
          >
            <PlayingCardBack width="w-72" height="h-auto" />
          </motion.div>
        </div>
      )}
    </>
  );
}
