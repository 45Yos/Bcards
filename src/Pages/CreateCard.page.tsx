import { useState } from "react";
import { FloatingLabel, Textarea, Button } from "flowbite-react";
import {
  validateCardForm,
  isCardFormValid,
} from "./CreateCardProps/CreateCardValidations";
import axios from "axios";
import { toast } from "react-toastify";

type CardFormData = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
};

export default function CreateCardForm() {
  const [formData, setFormData] = useState<CardFormData>({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: { url: "", alt: "" },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 1,
      zip: 0,
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    const updatedForm = { ...formData };

    if (keys.length === 1) {
      const key = keys[0] as keyof CardFormData;

      switch (key) {
        case "title":
        case "subtitle":
        case "description":
        case "phone":
        case "email":
        case "web":
          updatedForm[key] = value as string;
          break;
        default:
          break;
      }
    } else if (keys[0] === "image" && keys.length === 2) {
      updatedForm.image = {
        ...formData.image,
        [keys[1]]: value,
      };
    } else if (keys[0] === "address" && keys.length === 2) {
      const key = keys[1];

      updatedForm.address = {
        ...formData.address,
        [key]: key === "houseNumber" || key === "zip" ? Number(value) : value,
      };
    }

    const validation = validateCardForm(updatedForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validation[name] ?? "",
    }));

    setFormData(updatedForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCardForm(formData);
    setErrors(validationErrors);

    const token = localStorage.getItem("token");

    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitting form with data:", formData);

      axios
        .post(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
          formData,
          {
            headers: {
              "x-auth-token": token,
            },
          },
        )
        .then(() => {
          console.log("Form submitted successfully:", formData);
          // Reset form after successful submission
          setFormData({
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: { url: "", alt: "" },
            address: {
              state: "",
              country: "",
              city: "",
              street: "",
              houseNumber: 1,
              zip: 0,
            },
          });
          toast.success("Card created successfully!");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
  };

  const showError = (field: string) =>
    errors[field] && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400">
        {errors[field]}
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-4 rounded-md bg-white p-6 shadow-md dark:bg-gray-800"
    >
      <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
        Create New Card
      </h2>

      <FloatingLabel
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        label="Title"
        variant="filled"
      />
      <p>{showError("title")}</p>

      <FloatingLabel
        type="text"
        name="subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        label="Subtitle"
        variant="filled"
      />
      {showError("subtitle")}

      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        placeholder="Enter description"
      />
      {showError("description")}

      <FloatingLabel
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        label="Phone"
        variant="filled"
      />
      {showError("phone")}

      <FloatingLabel
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        label="Email"
        variant="filled"
      />
      {showError("email")}

      <FloatingLabel
        type="text"
        name="web"
        value={formData.web}
        onChange={handleChange}
        label="Website"
        variant="filled"
      />
      {showError("web")}

      <h3 className="mt-6 font-semibold text-gray-700 dark:text-white">
        Image
      </h3>
      <FloatingLabel
        type="text"
        name="image.url"
        value={formData.image.url}
        onChange={handleChange}
        label="Image URL"
        variant="filled"
      />
      {showError("image.url")}

      <FloatingLabel
        type="text"
        name="image.alt"
        value={formData.image.alt}
        onChange={handleChange}
        label="Image Alt"
        variant="filled"
      />
      {showError("image.alt")}

      <h3 className="mt-6 font-semibold text-gray-700 dark:text-white">
        Address
      </h3>

      <FloatingLabel
        type="text"
        name="address.state"
        value={formData.address.state}
        onChange={handleChange}
        label="State"
        variant="filled"
      />

      <FloatingLabel
        type="text"
        name="address.country"
        value={formData.address.country}
        onChange={handleChange}
        label="Country"
        variant="filled"
      />
      {showError("address.country")}

      <FloatingLabel
        type="text"
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
        label="City"
        variant="filled"
      />
      {showError("address.city")}

      <FloatingLabel
        type="text"
        name="address.street"
        value={formData.address.street}
        onChange={handleChange}
        label="Street"
        variant="filled"
      />
      {showError("address.street")}

      <FloatingLabel
        type="number"
        name="address.houseNumber"
        value={formData.address.houseNumber}
        onChange={handleChange}
        label="House Number"
        variant="filled"
      />
      {showError("address.houseNumber")}

      <FloatingLabel
        type="number"
        name="address.zip"
        value={formData.address.zip}
        onChange={handleChange}
        label="Zip"
        variant="filled"
      />

      <Button
        type="submit"
        disabled={!isCardFormValid(formData)}
        className="mt-6 w-full"
      >
        Create Card
      </Button>
    </form>
  );
}
