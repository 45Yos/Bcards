import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { Pagination } from "flowbite-react";

interface User {
  _id: string;
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  email: string;
  isBusiness: boolean;
  isAdmin: boolean;
}

const CrmPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );


      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / cardsPerPage);
  const indexOfLastUser = currentPage * cardsPerPage;
  const indexOfFirstUser = indexOfLastUser - cardsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-8 w-full">
      <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
        CRM
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        This is the CRM page where you can manage your users.
      </p>

      <div className="w-full overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="w-1 px-3 text-left text-sm font-medium uppercase text-gray-700 dark:text-gray-300">
                Delete
              </th>
              <th className="px-6 text-left text-sm font-medium uppercase text-gray-700 dark:text-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                  {user.name.first}
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete user"
                  >
                    <MdDeleteForever className="text-2xl" />
                  </button>
                </td>

                <td className="px-6  text-gray-800 dark:text-gray-100">
                  {user.isAdmin ? "Admin" : user.isBusiness ? "Business" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          showIcons
        />
      </div>
    </div>
  );
};

export default CrmPage;
