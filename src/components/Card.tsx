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
    <div>
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <h4>{subTitle}</h4>

      <p className="insideText flex items-center">
        <span>
          <span className="bold mr-4">Phone:</span>
        </span>
        {phone}
        <FaPhoneFlip className="mx-6" />
      </p>

      <p className="insideText">
        <span className="bold">Adress: </span> {adress}
      </p>

      <p>
        <span className="bold">Card No: </span> {cardN}
      </p>

      {(userId === userIdOfCard || isAdmin) && (
        <p className="mt-8 flex justify-end">
          <DeleteCardButton cardId={_id} />
        </p>
      )}

      {isLoggedIn && (
        <button
          onClick={() => onToggleLike(_id)}
          className="float-right mt-8 flex"
          aria-label={isLiked ? "Unlike card" : "Like card"}
        >
          {isLiked ? (
            <FcLike className="text-3xl" />
          ) : (
            <CiHeart className="text-3xl" />
          )}
        </button>
      )}
    </div>
  );
};

export default Card;
