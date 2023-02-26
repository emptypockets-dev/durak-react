import { GiHearts, GiDiamonds, GiSpades, GiClubs } from "react-icons/gi";
import clsx from "clsx";
import playingCardBack from "../assets/playing-card-back.png";
import { motion } from "framer-motion";

const PlayingCard = ({ card, handleClick, isFlipped }) => {
  let textClass = "";
  let icon = "";
  let iconColor = "";

  switch (card.suit) {
    case "hearts":
      textClass = "text-red-500 font-semibold";
      icon = <GiHearts />;
      iconColor = "red";
      break;
    case "diamonds":
      textClass = "text-red-500 font-semibold";
      icon = <GiDiamonds />;
      iconColor = "red";
      break;
    case "spades":
      textClass = "text-black font-semibold";
      icon = <GiSpades />;
      iconColor = "black";
      break;
    case "clubs":
      textClass = "text-black font-semibold";
      icon = <GiClubs />;
      iconColor = "black";
      break;
    default:
      break;
  }

  const variants = {
    front: { rotateY: "0deg" },
    back: { rotateY: "180deg" },
  };

  return (
    <div>
      <div
        onClick={() => handleClick(card)}
        className="relative mr-1 shadow-lg bg-white border border-gray-400 rounded-lg p-4 flex items-center justify-center h-40 w-28"
      >
        <div className="absolute top-0.5 left-2 flex flex-col items-center">
          <div className={clsx(textClass, "text-lg")}>{card.displayValue}</div>
          <div className="" style={{ color: iconColor }}>
            {icon}
          </div>
        </div>

        <div className="absolute bottom-1 right-2 flex flex-col items-center">
          <div className={clsx(textClass, "text-lg")}>{card.displayValue}</div>
          <div className="" style={{ color: iconColor }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayingCard;
