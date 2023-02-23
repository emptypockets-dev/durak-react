import { createMachine, assign, interpret, raise } from "xstate";
import { dealCards, sortHand } from "../services/dealCards";

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
      currentInstruction: "",
      discardPile: [],
      currentPlayer: "human",
      winner: null,
      currentAttack: null,
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          START_GAME: "starting",
        },
      },
      starting: {
        after: {
          50: {
            target: "dealing",
          },
        },
      },
      dealing: {
        entry: assign(dealCards),
        always: {
          target: "setTrumpCard",
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
            currentInstruction: "Lowest trump card goes first...",
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
        always: [
          {
            cond: (ctx) => ctx.currentPlayer === "human",
            target: "humanTurn",
          },
          { target: "computerTurn" },
        ],
      },
      resetHands: {
        entry: assign(resetHands),
        always: [
          {
            cond: checkForWin,
            target: "declareWinner",
          },
          { target: "selectCurrentPlayer" },
        ],
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
                    gameInstruction: () => "this",
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
            // move cards to discard pile
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
                playingField: [],
                discardPile: [...context.discardPile, discards],
              };
            }),
            always: "#Durak.resetHands",
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
                  500: "ready",
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
                  500: "ready",
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
            // move cards to discard pile
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
                discardPile: [...context.discardPile, discards],
              };
            }),
            always: "#Durak.resetHands",
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

function isValidCardSelection(context, event) {
  console.log("checking for isValidCardSelection", event);
  const { card } = event;
  const playingField = context.playingField;

  console.log("cardToCheck from is valid", card);

  if (playingField.length > 0) {
    /* reduce the playing field into an array of card objects */
    const cardsFromPlayingField = playingField.reduce((acc, curr) => {
      acc.push(curr.attack);
      if (curr.defend) {
        acc.push(curr.defend);
      }
      return acc;
    }, []);
    console.log("cards from playing field after reduce", cardsFromPlayingField);
    /* check if cards in playing field match the value of the selected card */
    const hasMatchingValue = cardsFromPlayingField.some((obj) => {
      return obj.value === card.value;
    });
    return hasMatchingValue;
  } else {
    return true;
  }
}

function isValidCardSelectionForDefend(context, event) {
  console.log("checking for isValidCardSelection", event);
  const { card } = event;
  const playingField = context.playingField;

  console.log("cardToCheck from is valid", card);

  if (playingField.length > 0) {
    /* reduce the playing field into an array of card objects */
    const cardsFromPlayingField = playingField.reduce((acc, curr) => {
      acc.push(curr.attack);
      if (curr.defend) {
        acc.push(curr.defend);
      }
      return acc;
    }, []);
    console.log("cards from playing field after reduce", cardsFromPlayingField);
    /* check if cards in playing field match the value of the selected card */
    const hasMatchingValue = cardsFromPlayingField.some((obj) => {
      const sameSuit = obj.suit === card.suit;
      const higherValue = obj.value < card.value;
      return sameSuit && higherValue;
    });
    const isATrumpCard = card.suit === context.trumpCard.suit;
    console.log("hasMatchingValue", hasMatchingValue);
    console.log("isAtrumpCard", isATrumpCard);
    return hasMatchingValue || isATrumpCard;
  } else {
    return true;
  }
}

function checkForInternalValidCard(defendingCard, card, trumpSuit) {
  const validSuit = defendingCard.suit === card.suit;
  console.log("valid suit", validSuit);
  const validValue = defendingCard.value > card.value;
  const isTrump = defendingCard.suit === trumpSuit;
  const attackingCardIsNotTrump = card.suit != trumpSuit;
  console.log(defendingCard, card);
  return (validSuit && validValue) || (isTrump && attackingCardIsNotTrump);
}

function defendHumanAttack(context, event) {
  // const { card } = event;
  const card = context.currentAttack;
  const [playerHand, computerHand] = context.hands;

  let defendStatus;
  let instruction;

  // Find a valid card to defend with
  let validCard = null;
  for (let i = 0; i < computerHand.length; i++) {
    const c = computerHand[i];
    console.log(checkForInternalValidCard(c, card, context.trumpCard.suit));
    if (checkForInternalValidCard(c, card, context.trumpCard.suit)) {
      // This card can be used to defend against the attack card
      defendStatus = true;
      instruction = "Continue attacking...";
      validCard = computerHand.splice(i, 1)[0];
      console.log("valid card in this loop", validCard);
      break;
    }
  }

  // If no valid card was found, the attack succeeds
  if (!validCard) {
    // console.log("Attack succeeds");
    instruction = "Cannot defend. Add cards or end your turn.";
    defendStatus = false;
    return {
      ...context,
      defendStatus,
      currentInstruction: instruction,
    };
  }

  // A valid card was found, so update the playing field with the attack and defend cards
  const newHands = [[...playerHand], [...computerHand]];

  const array = [...context.playingField];
  let attackDefend;

  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    // Check if the object's attack property matches the target attack object
    if (obj.attack === card) {
      attackDefend = obj;
      attackDefend.defend = validCard;
    }
  }

  const newContext = {
    ...context,
    currentInstruction: instruction,
    defendStatus,
    hands: newHands,
  };

  // console.log({ newContext });

  return newContext;
}

function resetHands(context, _) {
  const hands = context.hands;
  const deck = [...context.deck];

  // todo: who gets cards first?
  hands.forEach((hand) => {
    while (hand.length < 6 && deck.length > 0) {
      const card = deck.shift();
      hand.push(card);
    }
  });

  sortHand(hands[0], context.trumpCard);
  sortHand(hands[1], context.trumpCard);

  return {
    ...context,
    deck,
    hands,
  };
}

function getPlayerWithLowestTrump(context, event) {
  const hands = context.hands;
  const trumpSuit = context.trumpCard.suit;
  // filter hands include only cards with matching suit
  const filteredHands = hands.map((hand) =>
    hand.filter((card) => card.suit === trumpSuit)
  );
  // sort hands in descending order of value
  const sortedHands = filteredHands.map((hand) =>
    hand.sort((a, b) => a.value - b.value)
  );

  const humanCard = sortedHands[0][0]?.value;
  const computerCard = sortedHands[1][0]?.value;

  // compare the first card in the sorted hands
  let player;
  if (humanCard === undefined && computerCard === undefined) {
    player = "human";
  } else {
    player = humanCard < computerCard ? "human" : "computer";
  }

  return player;
}

function attackHuman(context, event) {
  const [playerHand, computerHand] = context.hands;
  let instruction = "computer is attacking you";
  let attackWithCard;

  // attack with a better card
  // if there are no cards in the playing area
  // attack with any card
  // if there are cards in the playing area
  // check for matching card first
  console.log("playing field right before options", context.playingField);
  let options = getMatchingValueOptions(context.playingField, computerHand);
  console.log("options", options);

  if (context.playingField.length > 0) {
    for (let i = 0; i < computerHand.length; i++) {
      const card = computerHand[i];
      if (options.includes(card.value)) {
        console.log(card);
        attackWithCard = card;
        computerHand.splice(i, 1);
        break;
      }
    }
    // for (const card of computerHand) {
    //   if (options.includes(card.value)) {
    //     console.log(card);
    //     attackWithCard = card;
    //     break;
    //   }
    // }
  } else {
    attackWithCard = computerHand.pop();
  }

  // add card to playing area
  const attackDefend = { attack: attackWithCard, defend: null };
  const playingField = [...context.playingField, attackDefend];

  const newContext = {
    ...context,
    hands: context.hands,
    playingField,
    currentInstruction: instruction,
  };

  return newContext;
}

function computerTryThrowingInCards(context, event) {
  console.log("computer try throwing in cards happened");

  const [playerHand, computerHand] = context.hands;
  const copyComputerHand = [...computerHand];
  const playingField = [...context.playingField];

  const removeCardFromHand = (card) => {
    const index = computerHand.indexOf(card);
    if (index > -1) {
      computerHand.splice(index, 1);
    }
  };

  const cardsFromPlayingField = playingField.reduce((acc, curr) => {
    acc.push(curr.attack);
    if (curr.defend) {
      acc.push(curr.defend);
    }
    return acc;
  }, []);

  // let allValues = cardsFromPlayingField
  //   .map((obj) => obj.value)
  //   .concat(computerHand.map((obj) => obj.value));

  const options = copyComputerHand.filter((card) => {
    return cardsFromPlayingField.some((obj) => obj.value === card.value);
  });

  let cardsToAdd = [];

  options.forEach((card) => {
    if (card) {
      const attackDefend = { attack: card, defend: null };
      cardsToAdd.push(attackDefend);
      removeCardFromHand(card);
    }
  });

  // see if any of the values of cards in your hand
  // match the values of any cards in the playingField

  const newPlayingField = [...context.playingField, ...cardsToAdd];

  console.log("new playing field", newPlayingField);

  // console.log("the computer should not have throwin in", options);

  return {
    ...context,
    playingField: newPlayingField,
  };
}

function defendComputerAttack(context, event) {
  // console.log("event", event);

  const { card } = event;
  const [playerHand, computerHand] = context.hands;

  let defendStatus;
  let instruction;
  let currentAttackCard;

  // console.log("playingFieldNow", context.playingField);
  for (let i = 0; i < context.playingField.length; i++) {
    currentAttackCard = context.playingField[i].attack;
  }

  // console.log("currentAttackCard", currentAttackCard);
  // console.log("defendComputerAttack", card);

  let newPlayerHand;

  const array = [...context.playingField];
  let attackDefend;
  for (let i = 0; i < array.length; i++) {
    const obj = array[i];

    // Check if the object's attack property matches the target attack object
    if (obj.attack === currentAttackCard) {
      attackDefend = obj;
      attackDefend.defend = card;
      // console.log({ attackDefend });
      // remove card from player hand
      newPlayerHand = playerHand.filter((handCard) => handCard !== card);
      // console.log("filteredCards", filteredCards);
    }
  }

  defendStatus = true;
  instruction = "you defended. computer continue attack.";

  return {
    ...context,
    currentInstruction: instruction,
    defendStatus,
    hands: [newPlayerHand, context.hands[1]],
  };
}

function humanTakesCards(context, event) {
  const [playerHand, computerHand] = context.hands;
  const playingField = context.playingField;

  playingField.forEach((card) => {
    if (card.attack) {
      playerHand.push(card.attack);
    }
    if (card.defend) {
      playerHand.push(card.defend);
    }
  });

  return {
    ...context,
    playingField: [],
  };
}

function computerhasValidAttackCard(context, event) {
  const [playerHand, computerHand] = context.hands;
  const playingField = context.playingField;

  if (context.playingField.length > 0) {
    return checkForMatchingValue(playingField, computerHand);
  } else {
    return true;
  }
}

function checkForMatchingValue(playingField, computerHand) {
  const cardsFromPlayingField = playingField.reduce((acc, curr) => {
    acc.push(curr.attack);
    acc.push(curr.defend);
    return acc;
  }, []);

  const hasMatchingValue = computerHand.some((obj1) => {
    return cardsFromPlayingField.some((obj2) => {
      return obj1.value === obj2.value;
    });
  });

  return hasMatchingValue;
}

function getMatchingValueOptions(playingField, hand) {
  console.log("playingField during func", playingField);
  const cardsFromPlayingField = playingField.reduce((acc, curr) => {
    acc.push(curr.attack);
    acc.push(curr.defend);
    return acc;
  }, []);

  let allValues = cardsFromPlayingField
    .map((obj) => obj.value)
    .concat(hand.map((obj) => obj.value));

  const options = allValues.filter((value) => {
    return (
      cardsFromPlayingField.some((obj) => obj.value === value) &&
      hand.some((obj) => obj.value === value)
    );
  });

  console.log("options during func", options);

  return options;
}

function checkForWin(context, event) {
  const emptyDeck = context.deck.length === 0;
  const emptyHumanHand = context.hands[0].length === 0;
  const emptyComputerHand = context.hands[1].length === 0;

  if ((emptyDeck && emptyHumanHand) || (emptyDeck && emptyComputerHand)) {
    console.log("someone is winning");
    return true;
  }
}

function assignWinner(context, event) {
  const emptyDeck = context.deck.length === 0;
  const emptyHumanHand = context.hands[0].length === 0;
  const emptyComputerHand = context.hands[1].length === 0;

  let winner;
  let currentInstruction;

  if (emptyDeck && emptyHumanHand) {
    winner = "human";
    currentInstruction = "you win! (human)";
  } else if (emptyDeck && emptyComputerHand) {
    winner = "compute";
    currentInstruction = "you lost... (computer wins)";
  }

  return {
    ...context,
    currentInstruction,
    winner,
  };
}
