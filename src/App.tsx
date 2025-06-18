import { BsFillInfoCircleFill } from "react-icons/bs";
import Card from "./components/Card";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { useAuth } from "./components/AuthContext";

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

function App({ searchTerm }: { searchTerm: string }) {
  const [cards, setCards] = useState<CardFromServer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const { userId } = useAuth();

  const getCards = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        {
          headers: {
            "x-auth-token": token || "",
          },
        },
      );

      console.log(response.data);

      setCards(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const toggleLike = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        {
          headers: { "x-auth-token": token || "" },
        },
      );

      const updatedCard = res.data;

      setCards((prevCards) =>
        prevCards.map((card) => (card._id === cardId ? updatedCard : card)),
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.phone.includes(searchTerm) ||
      card.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.address.street.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <main className="p-4">
      <h1 className="mainTitle text-center text-3xl font-bold">Cards Page</h1>

      <h2 className="mainH2 mb-4 text-center text-xl">
        Here you can find business cards from all categories
      </h2>

      <div className="cardsContainer">
        <div className="allCardsDiv grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {currentCards.map((card) => (
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

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          showIcons
        />
      </div>

      <hr
        className="mt-6 border-2 border-gray-500"
        style={{ border: "groove" }}
      />

      <div className="footer mt-4 flex justify-center">
        <BsFillInfoCircleFill
          onClick={() => alert("Create Card feature coming soon!")}
          className="cursor-pointer text-4xl transition hover:scale-125"
        />
      </div>
    </main>
  );
}

export default App;
