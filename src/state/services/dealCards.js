import { shuffle } from "lodash";

const mapValueToDisplay = (value) => {
  switch (value) {
    case 14:
      return "A";
    case 13:
      return "K";
    case 12:
      return "Q";
    case 11:
      return "J";
    default:
      return value.toString();
  }
};

const createDeck = () => {
  let suits = ["hearts", "diamonds", "spades", "clubs"];
  // suits = ["hearts", "diamonds", "spades", "clubs"];
  let values = [6, 7, 8, 9, 10, 11, 12, 13, 14];
  // values = [2, 3, 4, 5];

  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push({
        suit: suits[i],
        value: values[j],
        displayValue: mapValueToDisplay(values[j]),
        id: `${suits[i]}${values[j]}`,
      });
    }
  }
  return deck;
};

export const dealCards = (context, event) => {
  const unshuffledDeck = createDeck(); // create a deck of cards
  const deck = shuffle(unshuffledDeck); // shuffle the deck
  const { numPlayers, numCardsPerHand } = context.gameConfig; // get the number of players and cards per hand from the context

  const hands = []; // initialize an array to hold the hands of each player

  for (let i = 0; i < numPlayers; i++) {
    // deal the appropriate number of cards to each player
    const hand = deck.splice(0, numCardsPerHand);
    hands.push(hand);
  }

  const updatedContext = {
    ...context,
    deck,
    hands,
  };

  return updatedContext;
};
