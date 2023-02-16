import { createMachine, assign, interpret, raise } from "xstate";
import { send } from "xstate/lib/actions";
import { dealCards } from "../services/dealCards";

export const durakMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQK4CcCGBrAxAcQEEBZAUQH0B5ANRICUBtABgF1FQAHAe1gEsAXHpwB2bEAA9EAFgBMAGhABPRAEYAzJIB0ygGzTl0gKzKAHHv3GDAX0vzUmLBvZoweDAFswOAMoAVArR8yQlImViQQLl4BYVEJBGUATm0NAHZVVUZtbWMUhMkc7RT5JXi8jVUE40kUg20DA2NTVSsbEDtsDQgwDAAbHiEoAGEMNAhYHAhhMA1+gDdOLGn2hy7e-qGRsYQ5zgBjDGihUNDRSP5BEXC4gwyNBKNTY0Z6++1lYpU0jUYE1WUXhLKFKSbSMaTWWzoDqwMA9MC7AQDHxoFBudgTKYzITzRadKEOGFwhHrZGo9jbbF7A4XY4sU7cc4xK6IYxvDTGIEcgyMdKqaRyRSfVTfX7KZTPNRqSQtSH2DQAC1RGCEPnQQm8JAAMiRBoFBv4ACIncJnQ6xFTSBLScoJRgpcWgnlJIqC+KmDQg-IpYFWkHg1rLBVKlVqjXa3VkfW0I3KMIcBlm5nxRjPb7KSSSZqVN61AUlNQJD2MYz3AwyN7SfIQtr4oNuZWqtDqwYUIgABQAqj46GQfB3aAA5Y3xqIXc3xS3Wip2h0piqFD7xP53GrpaXSdKVMvVwO7TholB8MBoRvqgASHaIBAHvf7Q7pJoTY6Tam9HskVpuuXFjEk71dHIehYKQ8lU9RVH+1itEInBdPA4TLPSo5MqAcQALTaIuGE7rWTguO4YBIYylyoYg9oaAYIHSFUQIZH+lSLokmgllUNR1A0TQyjWcqrH0AzDKM8EjsR46qFkdxgs0f7SsWhiSIx5GSJJrJ0QkwJgjhcqEvCiJQKSaJEYmpEINoZRWnytrppWH4uvminKdoqnqf6sodIq9Yhk2hnPsZ4o1KkpmOTUKbemWjFlCxH7GBUDwcpImkdHuB5HieareSh4gqGWySgnkzSObo0i2SoYoerk-KVukJjSglDhQARFCzMe6UkZlpTJGkGRZDkeQFMVS7Cn+ZbPKorL-GkKRQZYQA */
  createMachine(
    {
      predictableActionArguments: true,
      id: "durak",
      initial: "preGame",
      context: {
        gameConfig: {
          numPlayers: 2,
          numCardsPerHand: 6,
        },
        deck: [],
        hands: [],
        count: 5,
        trumpCard: {},
        playingField: [],
      },
      states: {
        preGame: {
          on: {
            START_GAME: "dealingCards",
          },
        },
        dealingCards: {
          invoke: {
            src: dealCards,
            onDone: {
              target: "selectingTrump",
              actions: assign((context, event) => event.data),
            },
          },
        },
        selectingTrump: {
          invoke: {
            src: async (context) => {
              const topCard = context.deck.pop();
              return topCard;
            },
            onDone: {
              actions: assign((context, event) => ({
                ...context,
                trumpCard: event.data,
              })),
              target: "humanTurn",
            },
          },
        },
        humanTurn: {
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
                    const newHand = playerHand.filter(
                      (card) => card !== event.card
                    );
                    return [[...newHand], [...context.hands[1]]];
                  },
                }),
                target: "computerTurn",
              },
              {
                // If isValidCardSelection is false
                target: "humanTurn",
              },
            ],
            COMPUTER_TURN: "computerTurn",
            DONE_ATTACKING: "cleanUp",
          },
        },
        cleanUp: {
          // move cards to discard pile
        },
        computerCannotDefend: {
          entry: () => {
            console.log("computer cannot defend");
          },
        },
        computerTurn: {
          invoke: {
            src: defendHumanAttack,
            onDone: {
              actions: assign((context, event) => {
                return {
                  ...context,
                  hands: event.data.hands,
                };
              }),
              target: "humanTurn",
            },
          },
          on: {
            HUMAN_TURN: "humanTurn",
          },
        },
        gameOver: {
          type: "final",
        },
      },
      on: {
        GAME_OVER: "gameOver",
      },
    },
    {
      actions: {},
    }
  );

function isValidCardSelection() {
  return true;
}
async function defendHumanAttack(context, event) {
  const { card } = event;
  const [playerHand, computerHand] = context.hands;

  let defendStatus;

  // Find a valid card to defend with
  let validCard = null;
  for (let i = 0; i < computerHand.length; i++) {
    const c = computerHand[i];
    if (c.suit === card.suit && c.value > card.value) {
      // This card can be used to defend against the attack card
      defendStatus = true;
      validCard = computerHand.splice(i, 1)[0];
      break;
    }
  }

  // If no valid card was found, the attack succeeds
  if (!validCard) {
    console.log("Attack succeeds");
    defendStatus = false;
    // Set the defend card to null to indicate that the attack succeeded
    const newPlayingField = [{ attack: card, defend: null }];
    return { ...context, playingField: newPlayingField };
  }

  console.log(`Defending with ${validCard}`);

  // A valid card was found, so update the playing field with the attack and defend cards
  // const newPlayingField = [{ attack: card, defend: validCard }];

  const newHands = [[...playerHand], [...computerHand]];

  const array = [...context.playingField];
  let attackDefend;
  for (let i = 0; i < array.length; i++) {
    const obj = array[i];

    // Check if the object's attack property matches the target attack object
    if (obj.attack === card) {
      attackDefend = obj;
      attackDefend.defend = validCard;
      console.log({ attackDefend });
    }
  }

  return {
    ...context,
    defendStatus,
    hands: newHands,
  };
}
