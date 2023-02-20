import { GiHearts, GiDiamonds, GiSpades, GiClubs } from "react-icons/gi";
import clsx from "clsx";

const PlayingCard = ({ card, handleClick }) => {
  let textClass = "";
  let icon = "";
  let iconColor = "";

  switch (card.suit) {
    case "hearts":
      textClass = "text-red-500";
      icon = <GiHearts />;
      iconColor = "red";
      break;
    case "diamonds":
      textClass = "text-red-500";
      icon = <GiDiamonds />;
      iconColor = "red";
      break;
    case "spades":
      textClass = "text-black";
      icon = <GiSpades />;
      iconColor = "black";
      break;
    case "clubs":
      textClass = "text-black";
      icon = <GiClubs />;
      iconColor = "black";
      break;
    default:
      break;
  }

  return (
    <div
      onClick={() => handleClick(card)}
      className="relative mr-1 shadow-lg bg-white border border-gray-400 rounded-lg p-4 flex items-center justify-center h-32 w-24"
    >
      <div className="absolute top-0 left-2 flex flex-col items-center">
        <div className={clsx(textClass, "text-xl")}>{card.displayValue}</div>
        <div className="" style={{ color: iconColor }}>
          {icon}
        </div>
      </div>

      <div className="absolute bottom-1 right-2 flex flex-col items-center">
        <div className={clsx(textClass, "text-xl")}>{card.displayValue}</div>
        <div className="" style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default PlayingCard;
