import { createMachine, assign, interpret, raise } from "xstate";
import { dealCards, sortHand } from "../services/dealCards";

export const durakMachine =
  /** @xstate-layout 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-AEPuCEMy2fzBk-Ww3qk1QeV5XgL8CiwWBvQgWTCUJaGa0LGMGuF3j1zKwsW0NVQJXVX0NPxRjzwuy6E+H9k0HMJkQXk3hCxVDyFUAV1hyVUcNwDVVhSJTTTtzcMzVVEGQPEgJ8K6GlifUWGxyOkCMqjEKiOcJiN5RA3GGIPbCdExh0G8EeynBKhKj8O-jRnTFFgWGVA-Q-0iMdRoRQUEHt1MDwgriCSbhJBLCBwsMWEuAqicEnE8EmDCIcJgO0kzyILPSUwC0KW6FMC8DJGsI3m+ynFpWawrn6PyOWPsTiKgA7wfAGM2OzB2IWEAknE1xLH3G8m9FIi0MWNrXpjqU1Q7zRCmHHEgIe3KTW1aAOSs0G0GDuF8kF3CM-wdS3Qb13SyH3WDyAw4KJljyWGnHKhxA9xa2-izEqlIQxmBXyJ-QnT-XPgAwPTnTDXiLKLnlXyvE91lzxM3gKmzUWH7BC1fzJ2gNhU3UmW3UnX-VRMAyPT+ISLnnB3wmBTmJ6EmioP3Bkl3BDjKmC2HU+KFM7ipMeQ7yBJcGvAgXrhzE6RrinEOUvROR6XOXmMFM5XqlwxSBPyZLIzJB0DyE3mj0x1UA9wWEQOxDHHbSdCUDY0CCAA */
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
            currentInstruction: "Your turn to attack.",
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
          return {
            ...context,
            currentPlayer: "human",
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
