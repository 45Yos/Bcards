import { useEffect, useState } from "react";
import axios from "axios";
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

const LikedCards = () => {
  const { userId } = useAuth();
  const [likedCards, setLikedCards] = useState<CardFromServer[]>([]);

  useEffect(() => {
    const fetchLikedCards = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
          {
            headers: {
              "x-auth-token": token || "",
            },
          },
        );

        // סינון רק כרטיסים שהמשתמש אהב
        const filtered = res.data.filter((card: CardFromServer) =>
          card.likes.includes(userId || ""),
        );

        setLikedCards(filtered);
      } catch (err) {
        console.error("Error fetching liked cards:", err);
      }
    };

    fetchLikedCards();
  }, [userId]);

  const toggleLike = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        {
          headers: {
            "x-auth-token": token || "",
          },
        },
      );
      setLikedCards((prev) => prev.filter((card) => card._id !== cardId));
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-6 text-center text-2xl font-bold">Liked Cards</h2>

      {likedCards.length === 0 ? (
        <p className="text-center">No liked cards yet.</p>
      ) : (
        <div className="cardsContainer">
      <div className="grid m-auto gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {likedCards.map((card) => (
              <div className="eachCard" key={card._id}>
                <Card
                  key={card._id}
                  _id={card._id}
                  img={card.image.url}
                  title={card.title}
                  subTitle={card.subtitle}
                  phone={card.phone}
                  adress={card.address.city + ", " + card.address.street}
                  cardN={String(card.__v)}
                  userIdOfCard={card.user_id}
                  isLiked={true}
                  onToggleLike={toggleLike}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedCards;
