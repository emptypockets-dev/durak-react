import { useState } from "react";

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

const generateDeck = () => {
  let newDeck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      newDeck.push({ suit: suits[i], value: values[j] });
    }
  }
  return newDeck;
};

const useDeck = () => {
  const [deck, setDeck] = useState(() => generateDeck());
  return [deck, setDeck];
};

export default useDeck;
