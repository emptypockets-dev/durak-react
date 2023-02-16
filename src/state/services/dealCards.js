import { shuffle } from "lodash";

const createDeck = () => {
  const suits = ["hearts", "diamonds", "spades", "clubs"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push({ suit: suits[i], value: values[j] });
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
