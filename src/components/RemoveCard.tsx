import axios from "axios";
import { toast } from "react-toastify";

type DeleteCardProps = {
  cardId: string;
  onDeleteSuccess?: () => void;
};

export default function DeleteCardButton({
  cardId,
  onDeleteSuccess,
}: DeleteCardProps) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      toast.success("Card deleted successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error: unknown) {
      console.error("Failed to delete card:", error);
      toast.error("Failed to delete card");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete Card
    </button>
  );
}
