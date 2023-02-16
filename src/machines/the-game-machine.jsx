import { createContext, useContext, useReducer } from "react";
import { createMachine, assign } from "xstate";
import { shuffle } from "lodash";
import React from "react";
import { useMachine, useInterpret } from "@xstate/react";

const addCardToPlayingField = assign({
  playingField: (context, event) => [...context.playingField, event.card],
});

const globalMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QTAYwNYDpYAsCuAZgQDYCWAdlAMQAiAogMIDSA+gMoASAqgGI8AydGgG0ADAF1EoAA4B7WKQAupWeSkgAHogBMAVlGYAHAE5RARgAsl4wGZbANl0WANCACeiM8bOZRom6IWfob2hoYWhgC+ka4oGJgoAIZklFQMAIIASjRsLPTp-AAqYpJIIHIKyqrqWgj22oaYprrGrWH2NhY29q4eCF7avqK69hYA7Pr2trpj9tGxaFiKeABO5GyKiSuKVIVcmQBy7IVZhUIl6hVKKmpltWZ+xr42Y2Mvo9r+Y72eppj6ASCohCYQi2nmIDiWESik2GCo6UKJ2YFzKVyqt1A9y8BlshjGIQioleoR+CEMPgiIwmYwsxlCXhsEKhCTABDA5FgYFodB4dAOIgkl3k12qd0QNh8ZhMFm0tNEo0MNl0Zm+7kQdIsmHsszMI26qtEcuiMRA5FkKHgZShwsqNxqiAAtGZ7EYHjM9NMXREbGTHbomq1WuZtBZdCZibpmYtsPgiCkoLbRZjNBrtGSXWN-grbKqXcSInNTSykgmkxiHQguk9DCrdHpZfYzJ1tL71f0ddmppKxvnaSFo-FlmsNltFOX7eKELNGuFa7Txs2zGZ0+3tI4jDqV5YrIZI4PobDEhgJ2KsZ4cZgV3SQvULPezBnDINw2NtNpbMCVQPizGUOzOTAU8U1qEwjHxZUHDfWtazJF4tVEUw5WBD8ZjsMYDwSVQgLREUKynJUhlMYxaTeOU8QzBV-lbJVdG6VDlSZE0gA */
  createMachine(
    {
      predictableActionArguments: true,
      id: "deck",
      context: {
        deck: [],
        players: [],
        currentTurn: 0,
        currentPlayer: {},
        attacker: {},
        playingField: [],
      },
      initial: "shuffling",
      states: {
        shuffling: {
          entry: "shuffleDeck",
          on: {
            DECK_SHUFFLED: "dealing",
          },
        },
        dealing: {
          entry: "dealCards",
          on: {
            CARDS_DEALT: "attack",
          },
        },
        turnStart: {
          entry: "attack",
          on: {
            TURN_STARTED: "attack",
          },
        },
        attack: {
          entry: "promptAttack",
          on: {
            ATTACK: {
              actions: addCardToPlayingField,
            },
          },
        },
        defense: {
          on: {
            DEFEND: {
              actions: addCardToPlayingField,
            },
          },
        },
        done: {
          type: "final",
        },
      },
    },
    {
      actions: {
        shuffleDeck: assign((context) => {
          const shuffledDeck = shuffle(context.deck);
          return { ...context, deck: shuffledDeck };
        }),
        dealCards: assign((context) => {
          const { deck, players } = context;
          const numberOfCards = 6;
          const newPlayers = players.map((player, index) => {
            const start = index * numberOfCards;
            const end = start + numberOfCards;
            return {
              ...player,
              hand: deck.slice(start, end),
            };
          });
          return { ...context, players: newPlayers };
        }),
        // startTurn: assign((context) => {
        //   // Determine the current player and attacker
        //   const { players, currentTurn } = context;
        //   const currentPlayer = players[currentTurn % players.length];
        //   const attacker = players[(currentTurn + 1) % players.length];
        //   console.log({ currentPlayer, attacker });
        //   return { ...context, currentPlayer, attacker };
        // }),
        promptAttack: (context, event) => {
          // Display a prompt for the attacker to choose cards to attack with
          console.log("tell the attacker to attack", context);
        },
      },
    }
  );

export const GlobalContext = createContext();

export const GlobalStateProvider = ({ children, deck, players }) => {
  const [state, send] = useMachine(globalMachine, {
    context: {
      deck,
      players,
    },
  });
  return (
    <GlobalContext.Provider value={{ state, send }}>
      {children}
    </GlobalContext.Provider>
  );
};
