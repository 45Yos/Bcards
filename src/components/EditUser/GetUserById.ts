import axios from "axios";

type User = {
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
};

export const updateUserById = async (
  id: string,
  userData: Partial<User>,
  token: string,
) => {
  const { data } = await axios.put(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`,
    userData,
    {
      headers: {
        "x-auth-token": token,
      },
    },
  );
  return data;
};
