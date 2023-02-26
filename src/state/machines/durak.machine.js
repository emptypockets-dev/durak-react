import { createMachine, assign } from "xstate";
import {
  createDeck,
  dealCards,
  isValidCardSelection,
  isValidCardSelectionForDefend,
  defendHumanAttack,
  resetHands,
  getPlayerWithLowestTrump,
  attackHuman,
  computerTryThrowingInCards,
  defendComputerAttack,
  humanTakesCards,
  computerhasValidAttackCard,
  checkForWin,
  assignWinner,
} from "../../lib/lib";

export const durakMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBECuAnAhgawHQEsIAbMAYgGUAVAQQCVKB9AcWoFkBRAbQAYBdRUAAcA9rHwAXfMIB2AkAA9EARgBMAVlwA2NQA4AnNwDs3FUp3HNKgDQgAnsu4AWXI51nuew0u7cAzKbUAX0CbNCw8WHFMdElpKFJ5SMxxMFxMADMU9AAKNW4ASlIwnFwkmPw4nn4kEBExSRk5RQRfPR0tNV8dTT1dTzzDG3sEbw02lUdDRx8lA08lYNCMEogwTCIK+Kq5OokpWRrmzR0NV19fJ2m8pV81IYcxnQmpmbmvRZBiiLBxSnRUAC2ggAwtEIKRtjVdg0DqBmnpWrg8txLL5DCpPI41Hc7A9cONJtNuLMPO8Qp9lt8SABjcTkKLlOIABSImFsYHQEL4O1Ee0ah0QKmO+Mc2j0YqUmk0KMc9wQQtcuBu016RguQo+X1KYBp4mBGHQYGk4hZbI5XOqQl5MKagqlSuJnV0agMOhOcpUhjRuGMKj9KnORilhk1lNKDPEAHl0rRhKhpODIVb6vtbQh0R68polVilF4emZtKHwuHolGY3GExClJbatbUwKEGohS5PX5WvpPN1M2ZcELDNiLljejpiyVDbAfgAJTAJ2AWnkp-lwwUu7PS3rS7hqJSEuWWdrnDE3bcGW6+Md4CfT2cQeecGuLvmwhSC9S+XAmAPeJz6J4ek5DC0NoLjUaUwL0S9cFWalWUNAB1CppHNJM6yXF9mmPbgOnUNRXCmPC9FlXEEEcVQXE0RwVH0C5t38C9yS1AALQFZ0oDBpDScQompbBNgodgABl2GBRhgToZBUOhBsVwQPQlCUT8nm4HQLnOTpNDlNw9C0YlnmJNpugYpYSxYgE2I4rieL4uIBOE0SGHE2hJMfKF62XV8RjzT8fD8QxDH0ALNFUOVVHUPsblU3xNEMPQhWMilTNY6R2PQTjkms-jkEjAA5dgGGoSgaGBABpABJHKmCk9yMMQVpnDRTQj38MD9GI4YFMcD9zHRMCqJ-E4oLMiy0twalhCBVAsmQMB0jWFJwWyvKCqK6hSoqqruTc9C0wMRSVJUFS1PPTSSIDXofWMXcFPMT1IMYsNhpSyzxsm6bZvmyAily-LCuK8rKofWtpI85p6twRrmvUY4iNC7RFNcSiJgMZs3RDB6kvM57RtewQpo5Ga5uSL7yCEkSxIk6qdsbG59oC-zGq8N02jh8wIpRGidAMobktSzjcfx9BCc+8FSfsinnKBp8bRpyV8T0BXFaVxW4ein1TGo+SqMRnmsb53AjQgWN40TLbk2fXbiSUw7VPbDT9ytrrKPFbpDq7XWRs4gB3GRjarKmLcbeT9uU231Oij1fEVajDu3QwmpRTQPexziiFEcQ-dN4Gat23wQ5t477bO6GIZuDFKJ3CZzmT-W08iTPq2z6nZLi-OjrtiOzvVPtPHh7wvDw9GTJKJ79dWOaE34sXyccymzbQwOW4U632-D06OqFbMwJU3owLupqa8s8fDansmHKclym8XzyFMGEibkRWZPRdc5X6HxKR95o+Psn2zxJynKkZGDIHYAAMXYDlSS88Qa1TklbA6q8TqhSJEiTwh0wLNidlBAWWQx4-wgJsXAXtMB7FsokKIKQ0iZA5LkHwhQtQ4I5HgieBC4hEJIbEKAAcZayV3B4LQQ4BxKGxAiVwWkdDOF3OYKUmC3DdGwRNPGuDv4sMIYaTAEBbALm2tfZo-4SKuBUCKKiEFHCuA8Aot6TCVEnzYeozRjdpYyU8pYD0vclQGEMQiaKooEoMMUYLfWGVMC8UIcQ0h8RyHEyoVkWhBQihhkYegIJ3EQk2SgOwiJ3DnHNDML2FEAVJQ3HRAiO+G8eioP8lMai+g8wqEsUo6xo1gmhLsWsBx2TQaIAzAY24LhsTdDdMSaYeYGmBMsvY2wlBhDUFSbxbR5seE3y6NhIUeSTB5gHjiDeFwHS1NFAFEw24xnKNGpM6ZszrKOJ0Us3JKy+zBTcBs-ywjtnKAxO0PwTsXmtHfCcppnEIAyDAJctJYSOH8SiZQjIsTkT0MSQE05gLgWgtaRk8JnDOmwMlFzPsbgLhtUAl4UKKl2iqEoiiDwFczD-OSUfFFcz0m4EmQshety3xek-H6POPhXDjFCk8HS5xhFdSmLMPCjhaVjwZZlNpGitFSxuTk95WItASLaLvEpA5QpoM-OiKiPhxQunusPPAST9aGwblitMfpOVfh5b+fl99zAaDzn0VSXZtBJwxiUc1lkfbSEzpkzhCQkjQuoTkOFCSSx+tGgGoNGLNjWppiqARJhXZGF5WU5QZijHnG6FmLqYEaU+rNYigFRDfaVggMy9pCroE50bK4kiXQgLiimFzbQsUiLBHJNIYQqx4A1C+E4rpCAAC069ECTqgoQEgo7YFURJc4No7h5g+H8KM0tpZGRQAXTatmahYpnGCuBRGy78RyNJD+Td78tSrHWJsfdjZmxbzRHIztaJdBaQRoBO6+EnADigpOX4-wgSgnQBAZ9slDlImxJFWm-ds0IDcC4P9x7zCAaCNuycup6Rlk2Kadk6BoMuOQ0KAMAivSOD2uMIwwGdRgFpPqdAhpjREY5KRo41gzolKVLMbwdTg7AYjNGTOXG6pTE-Hk7t0p+rYh7FvXc7aZHolHNu684gZxzgk-KUVWgkYFLzKSh2H4VL9WmPRUUkrt0wTgmARC0hkIkaVWO5+il1DCNihpLobyWhs3beYrtCsbOmtwFATAAIwCRgAG6cdc7A2iGh9WRSrjy3wcoyKrMlOiPwnUDABkPmlXTwplZlZVvfdsENd5UWik1fVRX0qMqfQltMsxnDYlMB4fwlKug8Y3ri4w6k5hgSPI1sa5ahYfWJlB1rNNpQQycNuaiyp32hQCoeVQtx5K8uw2F0ellLXVt08YICNwYpGVUk8N0oVVDYTdHd7QZj8V+Mel-ONVaTYnaMEqaKQUuh9Zu-fA8LgzwDhMHMfw4264Z2O3N3hxgHSv38F6AeTVkGdCVEzQTUojCxXG8fX+e74c33krgN0npOxujRC1UK4Njh+gkVMTwRhQsfzLVYulxWSe5JFWqmj+hsRar88cZwxxtwV2qU4V7MbJvMNscTxZyqRiHSMaLjVQuMTapIv5IxkpLDUQHAqGjUqbFE+DS1pXY7VB5H5xro9Wu-MnB0toVXgGilolN6NQnrCMmTN0yKjQTU0E7fUERPQWkXQ4SOZMD3d6EWc5SbKxXbLlf66MUzr0-hVOUVu0erQwjaKG58FML3TXk8W7iAHrw93JhZ83ke3P98hTtBdF4MiFO8ySjL1ZMFcrNEB96M4IMTwzF5Cju1FVGhBMeFjm3ywPfzkzMZQHv02F1eC4d-0UKmtyfBnjpZoi5ge9AuQqi9JAfmwaBRDb3NBlPBykVgIto2JgoKVaCa9nE3E-0rP81thiaVePOygR6ZmwU6gd+swD+lWbMNuDMMMFg9S26sayKf+Fe-uwBIwbg2YGIfk9UCc6OMBZ20MkwgY3gx+yBcuh2CY4mmBfC7QrgZi5wA4XYwiOqoo5OAY6I3gPQ8kPe8acOVu2Kqudum+wudOuytwSMCI0oTOSBYWKBlaga1aleKeMCbW6g6+6qYhjuyC3kEiswxw0UKIpg-Bn2CYta8ql+qqweZEWexwLok+IwZiik+axITw0U2BNmwQQAA */
  createMachine({
    id: "Durak",
    context: {
      gameConfig: {
        numPlayers: 2,
        numCardsPerHand: 6,
      },
      deck: [],
      hands: [],
      trumpCard: {},
      playingField: [],
      defendStatus: false,
      currentInstruction: "POURING DRINKS...",
      discardPile: [],
      currentPlayer: "human",
      winner: null,
      currentAttack: null,
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          START_GAME: "shuffling",
        },
      },
      shuffling: {
        entry: assign(createDeck),
        after: {
          50: {
            target: "dealing",
          },
        },
      },
      dealing: {
        initial: "starting",
        states: {
          starting: {
            entry: assign(dealCards),
            after: {
              1000: {
                target: "done",
              },
            },
          },
          done: {
            always: {
              target: "#Durak.setTrumpCard",
            },
          },
        },
      },
      setTrumpCard: {
        entry: assign((context, event) => {
          // shift the first card off of the atack deck
          const topCard = context.deck.shift();
          // move it to the end of the deck
          context.deck.push(topCard);
          return {
            ...context,
            trumpCard: topCard,
          };
        }),
        always: {
          target: "selectStartingPlayer",
        },
      },
      selectStartingPlayer: {
        entry: assign((context, event) => {
          // todo: check for lowest card
          const playerWithLowestTrump = getPlayerWithLowestTrump(
            context,
            event
          );
          return {
            ...context,
            currentPlayer: playerWithLowestTrump,
            // currentPlayer: "human",
          };
        }),
        always: {
          target: "startOfRound",
        },
      },
      selectCurrentPlayer: {
        entry: assign((context, event) => {
          // todo: check if defended or not
          const playingNow = context.currentPlayer;
          const defended = context.defendStatus;
          let player;

          if (defended) {
            if (playingNow === "human") {
              player = "computer";
            }
            if (playingNow === "computer") {
              player = "human";
            }
          } else {
            player = context.currentPlayer;
          }
          return {
            ...context,
            currentPlayer: player,
          };
        }),
        always: {
          target: "startOfRound",
        },
      },
      startOfRound: {
        entry: assign((context, event) => {
          let instruction;
          if (context.currentPlayer === "human") {
            instruction = "Your turn to attack...";
          } else {
            instruction = "Computer is attacking you...";
          }
          console.log(instruction);
          return {
            ...context,
            currentInstruction: instruction,
          };
        }),
        always: [
          {
            cond: (ctx) => ctx.currentPlayer === "human",
            target: "humanTurn",
          },
          { target: "computerTurn" },
        ],
      },
      resetHands: {
        initial: "wait",
        states: {
          wait: {
            after: {
              0: "ready",
            },
          },
          ready: {
            entry: assign(resetHands),
            always: [
              {
                cond: checkForWin,
                target: "#Durak.declareWinner",
              },
              { target: "#Durak.selectCurrentPlayer" },
            ],
          },
        },
      },
      declareWinner: {
        entry: assign(assignWinner),
        always: {
          target: "gameOver",
        },
      },
      gameOver: {
        type: "final",
      },
      humanTurn: {
        initial: "attacking",
        states: {
          attacking: {
            entry: assign((context, event) => {
              return {
                ...context,
              };
            }),
            on: {
              SELECT_CARD: [
                {
                  cond: isValidCardSelection,
                  actions: assign({
                    playingField: (context, event) => {
                      const { card } = event;
                      const attackDefend = { attack: card, defend: null };
                      return [...context.playingField, attackDefend];
                    },
                    hands: (context, event) => {
                      const playerHand = context.hands[0];
                      const computerHand = context.hands[1];
                      // console.log("select card hands", playerHand);
                      const newHand = playerHand.filter(
                        (card) => card !== event.card
                      );
                      // console.log("newhand", newHand);
                      return [newHand, computerHand];
                    },
                  }),
                  target: "#Durak.computerTurn.defending",
                },
                {
                  // If isValidCardSelection is false
                  target: "attacking",
                },
              ],
              DONE_ATTACKING: {
                cond: (ctx) => ctx.playingField.length > 0,
                target: "endRound",
              },
            },
          },
          computerDefeated: {
            on: {
              DONE_ATTACKING: [
                {
                  cond: checkForWin,
                  target: "#Durak.declareWinner",
                },
                {
                  // if checkForWin is false
                  target: "wonRound",
                },
              ],
              SELECT_CARD: [
                {
                  cond: isValidCardSelection,
                  actions: assign({
                    playingField: (context, event) => {
                      const { card } = event;
                      const attackDefend = { attack: card, defend: null };
                      return [...context.playingField, attackDefend];
                    },
                    hands: (context, event) => {
                      const playerHand = context.hands[0];
                      const newHand = playerHand.filter(
                        (card) => card !== event.card
                      );
                      return [[...newHand], [...context.hands[1]]];
                    },
                  }),
                  target: "#Durak.humanTurn.computerDefeated",
                },
                {
                  // If isValidCardSelection is false
                  target: "computerDefeated",
                },
              ],
            },
          },
          endRound: {
            initial: "waiting",
            states: {
              waiting: {
                entry: assign((context, event) => {
                  const playingFieldCards = [...context.playingField];
                  // console.log("cleanup", playingFieldCards);
                  const discards = playingFieldCards.reduce((result, item) => {
                    if (item.attack) {
                      console.log("the attack item is", item.attack);
                      result.push(item.attack);
                    }
                    if (item.defend) {
                      result.push(item.defend);
                    }
                    return result;
                  }, []);
                  console.log("cleanup", discards);
                  return {
                    ...context,
                    playingField: [],
                    discardPile: [...context.discardPile, ...discards],
                  };
                }),
                after: {
                  500: "ready",
                },
              },
              ready: {
                always: "#Durak.resetHands",
              },
            },
          },
          wonRound: {
            // move cards to computer hand
            entry: assign((context, event) => {
              const playingFieldCards = [...context.playingField];
              // console.log("cleanup", playingFieldCards);
              const takingCards = playingFieldCards.reduce((result, item) => {
                if (item.attack) {
                  result.push(item.attack);
                }
                if (item.defend) {
                  result.push(item.defend);
                }
                return result;
              }, []);
              console.log("computer takes cards", takingCards);
              console.log("computer takes cards", context.hands[1]);
              return {
                ...context,
                playingField: [],
                hands: [
                  [...context.hands[0]],
                  [...context.hands[1], ...takingCards],
                ],
                gameInstruction: "Your turn to attack...",
                // discardPile: [...context.discardPile, discards],
              };
            }),
            always: "#Durak.resetHands",
          },
          lostRound: {
            entry: [assign(humanTakesCards), assign(resetHands)],
            always: [
              { cond: checkForWin, target: "#Durak.declareWinner" },
              {
                target: "#Durak.computerTurn.attacking",
              },
            ],
          },
          defending: {
            on: {
              SELECT_CARD: [
                {
                  cond: isValidCardSelectionForDefend,
                  actions: assign((context, event) => {
                    const newContext = defendComputerAttack(context, event);
                    return newContext;
                  }),
                  target: "#Durak.computerTurn.readyToAttack",
                },
                {
                  // If isValidCardSelection is false
                  target: "defending",
                },
              ],
              CANNOT_DEFEND: {
                cond: (ctx) => ctx.playingField.length > 0,
                target: "#Durak.computerTurn.wonRound",
                // this was humanTakesCards
                // computer can add cards
                // computer can move playfield to discard
                // computer goes again
              },
            },
          },
        },
      },
      computerTurn: {
        initial: "readyToAttack",
        states: {
          defending: {
            initial: "waiting",
            states: {
              waiting: {
                entry: assign({
                  currentAttack: (context, event) => {
                    const { card } = event;
                    const currentAttack = card;
                    return currentAttack;
                  },
                }),
                after: {
                  1000: "ready",
                },
              },
              ready: {
                entry: assign((context, event) => {
                  const newContext = defendHumanAttack(context, event);
                  return newContext;
                }),
                always: [
                  {
                    cond: (ctx) => ctx.defendStatus === true,
                    target: "#Durak.humanTurn.attacking",
                  },
                  {
                    target: "#Durak.humanTurn.computerDefeated",
                  },
                ],
              },
            },
          },
          attacking: {
            initial: "waiting",
            states: {
              waiting: {
                after: {
                  500: "ready",
                },
              },
              ready: {
                entry: assign((context, event) => {
                  const newContext = attackHuman(context, event);
                  return newContext;
                }),
                always: { target: "#Durak.humanTurn.defending" },
              },
            },
          },
          readyToAttack: {
            always: [
              {
                cond: computerhasValidAttackCard,
                target: "attacking",
              },
              { target: "doneAttacking" },
            ],
          },
          doneAttacking: {
            initial: "waiting",
            states: {
              waiting: {
                after: {
                  1000: "ready",
                },
              },
              ready: {
                always: [
                  {
                    cond: checkForWin,
                    target: "#Durak.declareWinner",
                  },
                  { target: "#Durak.computerTurn.endRound" },
                ],
              },
            },
          },
          endRound: {
            initial: "waiting",
            states: {
              waiting: {
                entry: assign((context, event) => {
                  const playingFieldCards = [...context.playingField];
                  // console.log("cleanup", playingFieldCards);
                  const discards = playingFieldCards.reduce((result, item) => {
                    if (item.attack) {
                      result.push(item.attack);
                    }
                    if (item.defend) {
                      result.push(item.defend);
                    }
                    return result;
                  }, []);
                  // console.log("cleanup", discards);
                  return {
                    ...context,
                    currentInstruction: "Your turn to attack.",
                    playingField: [],
                    discardPile: [...context.discardPile, ...discards],
                  };
                }),
                after: {
                  50: "ready",
                },
              },
              ready: {
                always: "#Durak.resetHands",
              },
            },
            // move cards to discard pile
          },
          wonRound: {
            initial: "waiting",
            states: {
              waiting: {
                entry: assign(computerTryThrowingInCards),
                after: {
                  500: "ready",
                },
              },
              ready: {
                always: { target: "#Durak.humanTurn.lostRound" },
              },
            },
          },
        },
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  });
