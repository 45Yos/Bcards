import axios from "axios";
import { toast } from "react-toastify";

export function handleFormChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>,
) {
  const { name, value } = e.target;

  switch (name) {
    case "name.first":
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, first: value },
      }));
      break;

    case "name.middle":
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, middle: value },
      }));
      break;

    case "name.last":
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, last: value },
      }));
      break;

    case "phone":
      setFormData((prev) => ({ ...prev, phone: value }));
      break;

    case "image.url":
      setFormData((prev) => ({
        ...prev,
        image: { ...prev.image, url: value },
      }));
      break;

    case "image.alt":
      setFormData((prev) => ({
        ...prev,
        image: { ...prev.image, alt: value },
      }));
      break;

    case "address.state":
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, state: value },
      }));
      break;

    case "address.country":
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, country: value },
      }));
      break;

    case "address.city":
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, city: value },
      }));
      break;

    case "address.street":
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, street: value },
      }));
      break;

    case "address.houseNumber":
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, houseNumber: value.toString() },
      }));
      break;

    case "address.zip":
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, zip: value.toString() },
      }));
      break;

    default:
      break;
  }
}

export type FormDataType = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
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
};

export const saveUserProfile = async (
  userId: string,
  token: string,
  formData: FormDataType,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  try {
    await axios.put(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
      {
        name: {
          first: formData.name.first,
          middle: formData.name.middle || "",
          last: formData.name.last,
        },
        phone: formData.phone,
        image: {
          url: formData.image.url,
          alt: formData.image.alt || "",
        },
        address: {
          state: formData.address.state,
          country: formData.address.country,
          city: formData.address.city,
          street: formData.address.street,
          houseNumber: formData.address.houseNumber,
          zip: formData.address.zip,
        },
      },
      {
        headers: {
          "x-auth-token": token,
        },
      },
    );

    toast.success("Profile updated successfully");

    if (onSuccess) {
      onSuccess();
    }

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update profile");

    if (onError) {
      onError();
    }
  }
};
