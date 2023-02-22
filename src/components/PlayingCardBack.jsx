import playingCardBack from "../assets/playing-card-back.png";

const PlayingCardBack = () => {
  return (
    <div className="h-32 w-24 rounded-lg drop-shadow-md">
      <img src={playingCardBack} alt="back of red playing card" />
    </div>
  );
};

export default PlayingCardBack;
