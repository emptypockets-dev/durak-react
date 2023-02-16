import PlayingCard from "../PlayingCard";

const Discard = ({ cards }) => {
  return (
    <div className="relative">
      {cards.map((card, index) => (
        <div className="absolute right-20" key={index}>
          <PlayingCard card={card} />
        </div>
      ))}
    </div>
  );
};

export default Discard;
