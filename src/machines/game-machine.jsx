// import { createContext, useContext, useReducer } from "react";
import { createMachine, assign } from "xstate";
// import { create, shuffle } from "lodash";
// import React from "react";
// import { useMachine, useInterpret } from "@xstate/react";

const gameMachine = createMachine({
  id: "game",
  initial: "start",
  states: {
    start: {
      on: {
        START_GAME: "playerTurn",
      },
    },
    playerTurn: {
      on: {
        SELECT_CARD: "discardCard",
        END_TURN: "opponentTurn",
      },
    },
    opponentTurn: {
      on: {
        END_TURN: "playerTurn",
      },
    },
    discardCard: {},
    gameOver: {},
    pause: {},
  },
});
