const humanPlayerMachine = gameMachine
  .withContext({
    hand: [], // the player's hand of cards
    selectedCard: null, // the card currently selected by the player
  })
  .withConfig({
    actions: {
      selectCard: assign({
        selectedCard: (context, event) => event.card,
      }),
      discardCard: assign({
        hand: (context, event) =>
          context.hand.filter((card) => card !== context.selectedCard),
        selectedCard: null,
      }),
    },
  })
  .withContext({
    playerId: "human",
  })
  .withId("human");
