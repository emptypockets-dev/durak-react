import playingCardBack from "../assets/playing-card-back.png";

const PlayingCardBack = ({ width = "h-32", height = "w-24" }) => {
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
