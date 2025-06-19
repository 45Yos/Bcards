import { FaPhoneFlip } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { useAuth } from "./AuthContext";
import DeleteCardButton from "./RemoveCard";

export type CardProps = {
  _id: string;
  img: string;
  title: string;
  subTitle: string;
  phone: string;
  adress: string;
  cardN: string;
  userIdOfCard: string;
  isLiked: boolean;
  onToggleLike: (cardId: string) => void;
};

const Card = ({
  _id,
  img,
  title,
  subTitle,
  phone,
  adress,
  cardN,
  userIdOfCard,
  isLiked,
  onToggleLike,
}: CardProps) => {
  const { isLoggedIn, userId, isAdmin } = useAuth();

  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden p-4 flex flex-col justify-between">
    <img
      src={img}
      alt={title}
      className="h-48 w-full object-cover rounded-md mb-4"
    />
  
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
      {title}
    </h3>
    <h4 className="text-md text-gray-500 dark:text-gray-300 mb-3">
      {subTitle}
    </h4>
  
    <p className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
      <span className="font-semibold mr-2">Phone:</span>
      {phone}
      <FaPhoneFlip className="ml-3 text-blue-500" />
    </p>
  
    <p className="text-gray-700 dark:text-gray-300 mb-1">
      <span className="font-semibold">Address:</span> {adress}
    </p>
  
    <p className="text-gray-700 dark:text-gray-300 mb-3">
      <span className="font-semibold">Card No:</span> {cardN}
    </p>
  
    {(userId === userIdOfCard || isAdmin) && (
      <div className="mt-4 flex justify-end">
        <DeleteCardButton cardId={_id} />
      </div>
    )}
  
    {isLoggedIn && (
      <button
        onClick={() => onToggleLike(_id)}
        className="self-end mt-4"
        aria-label={isLiked ? "Unlike card" : "Like card"}
      >
        {isLiked ? (
          <FcLike className="text-3xl" />
        ) : (
          <CiHeart className="text-3xl text-gray-500 hover:text-red-500" />
        )}
      </button>
    )}
  </div>
  
  );
};

export default Card;
