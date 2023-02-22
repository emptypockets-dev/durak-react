import playingCardBack from "../assets/playing-card-back.png";

const PlayingCardBack = ({ width = "w-28", height = "h-40" }) => {
  return (
    <div className={`${width} ${height} rounded-lg drop-shadow-md`}>
      <img
        src={playingCardBack}
        className="w-full pointer-events-none"
        alt="back of red playing card"
      />
    </div>
  );
};

export default PlayingCardBack;
