import axios from "axios";
import { useState, useEffect } from "react";
import EditProfile from "../components/EditUser";

const getUserIdFromToken = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload._id || null;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

const getUserById = async () => {
  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  try {
    const { data } = await axios.get(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

interface User {
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  email: string;
  phone: string;
  _id: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  isBusiness: boolean;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getUserById();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-100 px-4 py-10 dark:bg-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
        {!isEditing ? (
          <>
            <div className="flex flex-col items-center">
              <img
                src={user.image?.url || "https://via.placeholder.com/150"}
                alt={user.image?.alt || "Profile"}
                className="mb-4 size-32 rounded-full border-4 border-purple-400 object-cover shadow-md"
              />
              <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                {user.name.first} {user.name.middle && user.name.middle + " "}
                {user.name.last}
              </h2>
            </div>

            <div className="mt-6 space-y-2 text-gray-800 dark:text-gray-200">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-semibold">State:</span>{" "}
                {user.address.state === "not defined"
                  ? "---"
                  : user.address.state}
              </p>
              <p>
                <span className="font-semibold">Street:</span>{" "}
                {user.address.street}
              </p>
              <p>
                <span className="font-semibold">City:</span> {user.address.city}
              </p>
              <p>
                <span className="font-semibold">Country:</span>{" "}
                {user.address.country}
              </p>
              <p>
                <span className="font-semibold">House Number:</span>{" "}
                {user.address.houseNumber}
              </p>
              <p>
                <span className="font-semibold">Zip Code:</span>{" "}
                {user.address.zip}
              </p>
              {user.isBusiness && (
                <p className="text-green-600">
                  <span className="font-semibold text-black dark:text-white">
                    Business:
                  </span>{" "}
                  Yes
                </p>
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  ערוך פרופיל
                </button>
              </div>
            </div>
          </>
        ) : (
          <EditProfile
            user={user}
            token={token!}
            onCancel={() => setIsEditing(false)}
            onSave={() => {
              setIsEditing(false);
              location.reload();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
getUserById;
