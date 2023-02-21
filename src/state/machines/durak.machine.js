import { createMachine, assign, interpret, raise } from "xstate";
import { dealCards } from "../services/dealCards";

export const durakMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBECuAnAhgawHQEsIAbMAYgG0AGAXUVAAcB7WfAF30YDs6QAPRAIwAmAKy4AbCIAcAdiHiALAGZxlNUoUAaEAE9BlMQE4pQhWqmUhl8eKUBfO9rRY8sVpnTtOUCjR5MWdi4efgQlISlcQxkpKUMRaRkBESVDLV19IxMzSgsreVsHJwwcXAgwTCJ8b19aJBAAtg5uetDpAVwrFI0FYWiZdL0EAQMo7PNLa0LHEGdS2DBWABV0VABbegBhDwha-2Ym4NbEKSUlXGUBGRlwpVi1Q20hkazTCfybexm51zASAGNWABldyeapQAAKREwOjA6D29UaQRaoFCAmE4lwIniSXiSmk4XET0yYzeuUmBS+xRcuAWANYmww6DAnFYUJhcIRDAOyJCiCEAnOlAGVko4giAo0UmJYVkUXENykInU4tMCiKsxKrlBrAA8gAzABKjFQnF2VDq3MCzT5CEluGFClF4pMgoU0oyCFkmIV4kFAgUToUhnkGp+tJ1BuNpvNAktDR5NuOdsFDpFahdkvdMskHRklGUcSEEUk8TDWtwzIWrAAEpgzbAuQnrUdUYJlDJOkrjNixRZcjKUnnckoBDYrgSROWaQALdb1pYYThlMD6lkQcGkIEAUQAMtvNksAPqbACChuQFv2LZRfEEAiVDuxIgU+Ys-UGglSQgdtnCsT6EQZGnUo5zWBclxXNczU3Hd90PE9z0vONr0OW9QgAWlsMRxEMRQZHiIRRxMEQZWEU5cFiO4lXdP0lAGEC8DAiD0GXcpoI3GozwAOW43Vj2QbcADFt24y8-ERRNWzvBAMI0TErlOZJZFycUbDIs4fwUaQRCsa4gNOYDvgrZjOEXVjcFMpYcDgbZ0AgRsr0km9bXRR8DHiV9yQ-DTAyxGRlUkWRCPCRjLPnMzIMwVh3H+bAtz3A9jzPC8nKtNDXIfMQPJfN9KB8z10XRXB0SEQwVCUNRXyEMKrKimLMDihL4OSpDyBQ5yMuTLD8QkPDXxCh9RDI8xcFSEjkmuLz1WM2cIvM5doti+LkF1bjtyPU8liWU9NgAaQASW4gBxNLmy6ttZPkkqYlHRJVIKEaRExaIIikcR3qSMcpFq+bIP1ap8FgGdTwaprVvWzbtt2w6TrOpEk0uuSFAU27lLfNSiU9NIf0McqZHFK4BDwhJfvAyKLIBzggZBsH4rgpLENSiT0t5ZM3Oy58vPfKaRoDSjvXevCkjfMmWOXKmadB5bmsZlLkPjBHpMw7C+vwwaSJlOIFAuYmMViIi9bFinl3+Eh6wAVXoJslfQ+93K5vKCqGIdcDfUdxwC04qU1Gl-kYDZUFYOEFqg9dN3hqS7bCRQSssAnhVUGJdKx54godYshFxVQEkFML-cD4P0FD9jw5qdrFaj20ejjrOk6TpV5DI-MdYzSR5AMAop1m0oC-oIOQ-q5aI5Z862cu+idZGOvE+FRvU8EZ7KAdQNAxsAiXzHfOA-7ovQ+QVcKmD3Z5aPHa9tEyOXOTFQp-j+u55Tsik6xcJ8zwvoApmmZOEYcp4HqD8VC48ZIYRuB0XC6tdLEWGp6LCDo1AqjiNENIIgBBhUICQYBiMZJOhGjrYwE4RhpHiM9MKbgPBeCgNg5W-IHyUT9CYCISRgzCnwWMImY4Ei9G0j7cM5RKjghodHJ0P4HzExDJYeQgYlBaw6O6Z6G8zjvRRjNak8xFgrHWFsHYwjbQKh1mYKQyhcjuhRjEORFwlQKjxHcRQihyF-DAICEElDwTslhOgPRyYQw+ilJAkUhhBSWIUTY7oKiHE91+PSRk6BmSsg8XCbxl1kiVSsYYXIRFRFBJlMGc4BEYhyGxBk4m5DIxGhNGaZJMkgI5lfBcNBBFDJyDKmo32pQqyLDrA2apaIs6RHkNI-EY5zEyEHMKTo6I0H4UoGccq3d1FMT+qxXpiAsIUUgQNaBQ1SKegsC9M4yoMnKhiKYY2odMFgFWbJFInYCa+nyskKRHpnjCB-PRG4BMs6DNKVE8K5MS6Hxgt4a5GEEiGBKqYRSicYjRA0qkMaNxAy3XouRc5kErI2VgHZByoKLBxydKYoCYpgmFUqhClGaoQwBlwlndFFklqNWwKCl8YgEi3EUO+AsYzCpinOLEGIgoQzKhRvSiWgNgbSyZSymwaZei5FOK9d6MoSFRFUkWMq2sfp-LqhZM2FROBW1BXIKIGSzFjiCbRBeCB5lpgKQogkbTwx9wHsXJc1yRkdEzl9YWH8hBa16r4rO9FjHig0NvQug8LKXI9XIQxBhnk2CArs152lKJyGMXIdEwZiwRt3lGtiQLOLUM6iAtEH0IXevRL6v0-rsZEV1lYK4BYgqhj+S6veQ8mVCNLTg8tcROjFh9TY2tZErA6xUG8UhGTfR5tdaHSWkq6YesgQ6aICoYh-jHDy54lhIhxHosWaZGgCxzs7RZA+a5oqQFjREN2-SgIjEUGgkaco7j-loqkMcXwHBAA */
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
    },
    initial: "idle",
    states: {
      idle: {
        always: {
          target: "starting",
        },
      },
      starting: {
        always: {
          target: "dealing",
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
        initial: "attack",
        states: {
          idle: {},
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
                target:
                  "#Durak.computerTurn.computerFinishAttackAfterHumanTakes",
                // this was humanTakesCards
                // computer can add cards
                // computer can move playfield to discard
                // computer goes again
              },
            },
          },
          humanTakesCards: {
            entry: [assign(humanTakesCards), assign(resetHands)],
            always: [
              { cond: checkForWin, target: "#Durak.declareWinner" },
              {
                target: "#Durak.computerTurn.attacking",
              },
            ],
          },
          attack: {
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
                  target: "attack",
                },
              ],
              DONE_ATTACKING: {
                cond: (ctx) => ctx.playingField.length > 0,
                target: "humanCleanUp",
              },
            },
          },
          finishAttackAfterComputerCannotDefend: {
            on: {
              DONE_ATTACKING: [
                {
                  cond: checkForWin,
                  target: "#Durak.declareWinner",
                },
                {
                  // if checkForWin is false
                  target: "humanCleanUpAndComputerTakesPlayingField",
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
                  target:
                    "#Durak.humanTurn.finishAttackAfterComputerCannotDefend",
                },
                {
                  // If isValidCardSelection is false
                  target: "finishAttackAfterComputerCannotDefend",
                },
              ],
            },
          },
          humanCleanUp: {
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
                currentInstruction: "just cleaned up, human was done attacking",
                playingField: [],
                discardPile: [...context.discardPile, discards],
              };
            }),
            always: "#Durak.resetHands",
          },
          humanCleanUpAndComputerTakesPlayingField: {
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
                currentInstruction: "just cleaned up, human was done attacking",
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
        },
      },
      computerTurn: {
        initial: "readyToAttack",
        states: {
          idle: {},
          defending: {
            entry: assign((context, event) => {
              const newContext = defendHumanAttack(context, event);
              return newContext;
            }),
            always: [
              {
                cond: (ctx) => ctx.defendStatus === true,
                target: "#Durak.humanTurn.attack",
              },
              {
                target:
                  "#Durak.humanTurn.finishAttackAfterComputerCannotDefend",
              },
            ],
          },
          readyToAttack: {
            always: [
              {
                cond: computerhasValidAttackCard,
                target: "attacking",
              },
              { target: "endComputerAttack" },
            ],
          },
          endComputerAttack: {
            always: [
              {
                cond: checkForWin,
                target: "#Durak.declareWinner",
              },
              { target: "computerCleanUp" },
            ],
          },
          computerCleanUp: {
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
                currentInstruction:
                  "just cleaned up, computer was done attacking",
                playingField: [],
                discardPile: [...context.discardPile, discards],
              };
            }),
            always: "#Durak.resetHands",
          },
          attacking: {
            entry: assign((context, event) => {
              const newContext = attackHuman(context, event);
              return newContext;
            }),
            always: { target: "#Durak.humanTurn.defending" },
          },
          computerFinishAttackAfterHumanTakes: {
            // try to throw in cards
            entry: assign(computerTryThrowingInCards),
            always: {
              target: "#Durak.humanTurn.humanTakesCards",
            },
            // then humanTakesCards
          },
          finishAttack: {},
          Defeated: {
            on: {
              CARD_TAKEN: {
                target:
                  "#Durak.humanTurn.finishAttackAfterComputerCannotDefend",
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
  const { card } = event;
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
      instruction = "Defended. Continue attack or move to discard.";
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
