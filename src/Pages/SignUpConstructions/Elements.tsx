import axios from "axios";
import { toast } from "react-toastify";

export type FormData = {
  name: { first: string; middle: string; last: string };
  phone: string;
  email: string;
  password: string;
  image: { url: string; alt: string };
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

export const initialFormData: FormData = {
  name: { first: "", middle: "", last: "" },
  phone: "",
  email: "",
  password: "",
  image: { url: "", alt: "" },
  address: {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  },
  isBusiness: false,
};

export const isFormValid = (formData: FormData): boolean =>
  formData.name.first.length >= 2 &&
  formData.name.last.length >= 2 &&
  formData.phone.startsWith("05") &&
  formData.phone.length > 9 &&
  formData.phone.length < 11 &&
  formData.email.includes("@") &&
  formData.email.length >= 5 &&
  formData.password.length >= 7 &&
  formData.password.length <= 20 &&
  formData.address.country.length >= 2 &&
  formData.address.city.length >= 2 &&
  formData.address.street.length >= 2 &&
  Number(formData.address.houseNumber) > 0 &&
  Number(formData.address.zip) > 0;

export const getFieldColor = (
  formData: FormData,
  field: string,
): "success" | "error" | undefined => {
  const map: Record<string, string> = {
    first: formData.name.first,
    middle: formData.name.middle,
    last: formData.name.last,
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
    url: formData.image.url,
    alt: formData.image.alt,
    state: formData.address.state,
    country: formData.address.country,
    city: formData.address.city,
    street: formData.address.street,
    houseNumber: formData.address.houseNumber,
    zip: formData.address.zip,
  };

  const val = map[field];
  if (!val) return undefined;

  switch (field) {
    case "first":
    case "last":
    case "country":
    case "city":
    case "street":
      return val.length >= 2 ? "success" : "error";

    case "phone":
      return val.startsWith("05") && val.length > 9 && val.length < 11
        ? "success"
        : "error";

    case "email":
      return val.includes("@") && val.length >= 5 ? "success" : "error";

    case "password": {
      const validPassword =
        val.length >= 9 &&
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[!@#$%^&*-]/.test(val);
      return validPassword ? "success" : "error";
    }

    case "houseNumber":
    case "zip":
      return Number(val) > 0 ? "success" : "error";

    default:
      return undefined;
  }
};

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: FormData,
) => {
  e.preventDefault();

  const payload = {
    name: {
      first: formData.name.first,
      last: formData.name.last,
      ...(formData.name.middle.length >= 2 && {
        middle: formData.name.middle,
      }),
    },
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
    image: {
      ...(formData.image.url.length >= 14 && { url: formData.image.url }),
      ...(formData.image.alt.length >= 2 && { alt: formData.image.alt }),
    },
    address: {
      country: formData.address.country,
      city: formData.address.city,
      street: formData.address.street,
      houseNumber: Number(formData.address.houseNumber),
      zip: Number(formData.address.zip),
      ...(formData.address.state.length >= 2 && {
        state: formData.address.state,
      }),
    },
    isBusiness: formData.isBusiness,
  };

  try {
    await axios.post(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
      payload,
    );
    toast.success("User created successfully!");
    setTimeout(() => (window.location.href = "/signin"), 2000);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Registration error:",
        error.response?.data || error.message || error,
      );
    } else if (error instanceof Error) {
      console.error("Registration error:", error.message);
    } else {
      console.error("Registration error:", error);
    }
    toast.error("Registration failed. Please check the input.");
  }
};
