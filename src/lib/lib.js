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

  const trumpCard = deck[0]; // assign the top card on the deck as the trump card
  hands.forEach((hand) => {
    // sort the cards in each hand based on their value and trump status
    hand.sort((a, b) => {
      if (a.suit === trumpCard.suit && b.suit === trumpCard.suit) {
        // both cards are trump cards, sort by value
        return b.value - a.value;
      } else if (a.suit === trumpCard.suit) {
        return -1; // a is the trump card, so it should come first
      } else if (b.suit === trumpCard.suit) {
        return 1; // b is the trump card, so it should come first
      } else {
        // neither card is the trump card
        if (a.value === b.value) {
          // if the cards have the same value, sort by suit
          return a.suit.localeCompare(b.suit);
        } else {
          // sort by value
          return b.value - a.value;
        }
      }
    });
  });

  const updatedContext = {
    ...context,
    deck,
    hands,
  };

  return updatedContext;
};

export const sortHand = (hand, trumpCard) => {
  return hand.sort((a, b) => {
    if (a.suit === trumpCard.suit && b.suit === trumpCard.suit) {
      // both cards are trump cards, sort by value
      return b.value - a.value;
    } else if (a.suit === trumpCard.suit) {
      return -1; // a is the trump card, so it should come first
    } else if (b.suit === trumpCard.suit) {
      return 1; // b is the trump card, so it should come first
    } else {
      // neither card is the trump card
      if (a.value === b.value) {
        // if the cards have the same value, sort by suit
        return a.suit.localeCompare(b.suit);
      } else {
        // sort by value
        return b.value - a.value;
      }
    }
  });
};

export function isValidCardSelection(context, event) {
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

export function isValidCardSelectionForDefend(context, event) {
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

export function defendHumanAttack(context, event) {
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

export function resetHands(context, _) {
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

export function getPlayerWithLowestTrump(context, event) {
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

  console.log({ humanCard, computerCard });

  // compare the first card in the sorted hands
  let player;
  if (humanCard === undefined && computerCard === undefined) {
    player = "human";
  } else {
    player = humanCard < computerCard ? "human" : "computer";
  }
  console.log("the player should be", player);
  return player;
}

export function attackHuman(context, event) {
  const [playerHand, computerHand] = context.hands;
  let instruction = "computer is attacking you...";
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

export function computerTryThrowingInCards(context, event) {
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

export function defendComputerAttack(context, event) {
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

export function humanTakesCards(context, event) {
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

export function computerhasValidAttackCard(context, event) {
  const [playerHand, computerHand] = context.hands;
  const playingField = context.playingField;

  if (context.playingField.length > 0) {
    return checkForMatchingValue(playingField, computerHand);
  } else {
    return true;
  }
}

export function checkForWin(context, event) {
  const emptyDeck = context.deck.length === 0;
  const emptyHumanHand = context.hands[0].length === 0;
  const emptyComputerHand = context.hands[1].length === 0;

  if ((emptyDeck && emptyHumanHand) || (emptyDeck && emptyComputerHand)) {
    console.log("someone is winning");
    return true;
  }
}

export function assignWinner(context, event) {
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

function checkForInternalValidCard(defendingCard, card, trumpSuit) {
  const validSuit = defendingCard.suit === card.suit;
  console.log("valid suit", validSuit);
  const validValue = defendingCard.value > card.value;
  const isTrump = defendingCard.suit === trumpSuit;
  const attackingCardIsNotTrump = card.suit != trumpSuit;
  console.log(defendingCard, card);
  return (validSuit && validValue) || (isTrump && attackingCardIsNotTrump);
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
