import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useAuth } from "../components/AuthContext";

type CardFromServer = {
  _id: string;
  image: { url: string };
  title: string;
  subtitle: string;
  phone: string;
  address: {
    city: string;
    street: string;
  };
  __v: number;
  user_id: string;
  likes: string[];
};

const MyCards = () => {
  const [myCards, setMyCards] = useState<CardFromServer[]>([]);
  const [error, setError] = useState("");

  const { userId } = useAuth();

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
          {
            headers: {
              "x-auth-token": token,
            },
          },
        );
        setMyCards(response.data);
      } catch (err) {
        console.error(err);
        setError("נכשל לטעון את הכרטיסים שלך");
      }
    };

    fetchMyCards();
  }, []);

  const toggleLike = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );
      setMyCards((prevCards) =>
        prevCards.map((card) =>
          card._id === cardId
            ? {
                ...card,
                likes: card.likes.includes(userId || "")
                  ? card.likes.filter((id) => id !== userId)
                  : [...card.likes, userId || ""],
              }
            : card,
        ),
      );
    } catch (err) {
      setError("נכשל לעדכן את הלייק");
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">הכרטיסים שלי</h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="cardsContainer">
        <div className="allCardsDiv grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {myCards.map((card) => (
            <div className="eachCard" key={card._id}>
              <Card
                _id={card._id}
                img={card.image.url}
                title={card.title}
                subTitle={card.subtitle}
                phone={card.phone}
                adress={card.address.city + ", " + card.address.street}
                cardN={String(card.__v)}
                userIdOfCard={card.user_id}
                isLiked={card.likes.includes(userId || "")}
                onToggleLike={toggleLike}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCards;
