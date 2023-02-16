import PlayingCardBack from "../PlayingCard/PlayingCardBack";

const OpponentHand = ({ count }) => {
  const hand = [...Array(count)].map((_, i) => i);
  return (
    <>
      <div className="flex">
        {hand.map((index) => (
          <div key={index}>
            <PlayingCardBack />
          </div>
        ))}
      </div>
    </>
  );
};

export default OpponentHand;
