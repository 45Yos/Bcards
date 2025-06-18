export type FormCardData = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image?: {
    url: string;
    alt?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
};

type ValidationErrors = Partial<Record<keyof FormCardData | string, string>>;

export function validateCardForm(form: FormCardData): {
  [key: string]: string;
} {
  const errors: ValidationErrors = {};

  // Helper to check string length
  const isShort = (value: string, min: number) => value.trim().length < min;
  const isLong = (value: string, max: number) => value.trim().length > max;

  // Title
  if (!form.title || isShort(form.title, 2) || isLong(form.title, 256)) {
    errors.title = "Title must be between 2 and 256 characters.";
  }

  // Subtitle
  if (
    !form.subtitle ||
    isShort(form.subtitle, 2) ||
    isLong(form.subtitle, 256)
  ) {
    errors.subtitle = "Subtitle must be between 2 and 256 characters.";
  }

  // Description
  if (
    !form.description ||
    isShort(form.description, 2) ||
    isLong(form.description, 1024)
  ) {
    errors.description = "Description must be between 2 and 1024 characters.";
  }

  // Phone
  if (!form.phone || form.phone.length < 9 || form.phone.length > 11) {
    errors.phone = "Phone must be between 9 and 11 digits.";
  }

  // Email
  if (
    !form.email ||
    form.email.length < 5 ||
    !/\S+@\S+\.\S+/.test(form.email)
  ) {
    errors.email = "Invalid email.";
  }

  // Web (optional, but if filled must be at least 14 chars)
  if (form.web && form.web.length < 14) {
    errors.web = "Website must be at least 14 characters.";
  }

  // Image URL
  if (form.image?.url?.length && form.image.url.length < 14) {
    errors["image.url"] = "Image URL must be at least 14 characters.";
  }

  // Image Alt
  if (
    form.image &&
    form.image.alt &&
    (isShort(form.image.alt, 2) || isLong(form.image.alt, 256))
  ) {
    errors["image.alt"] = "Alt must be between 2 and 256 characters.";
  }

  // Address

  if (
    form.address.state &&
    (isShort(form.address.state, 2) || isLong(form.address.state, 256))
  ) {
    errors["address.state"] = "State must be between 2 and 256 characters.";
  }
  if (!form.address.country) {
    errors["address.country"] = "Country is required.";
  }

  if (!form.address.city) {
    errors["address.city"] = "City is required.";
  }

  if (!form.address.street) {
    errors["address.street"] = "Street is required.";
  }

  if (!form.address.houseNumber || form.address.houseNumber < 1) {
    errors["address.houseNumber"] = "House number must be at least 1.";
  }

  // Remove undefined values to match the return type
  const filteredErrors: { [key: string]: string } = {};
  Object.keys(errors).forEach((key) => {
    const value = errors[key];
    if (typeof value === "string") {
      filteredErrors[key] = value;
    }
  });
  return filteredErrors;
}

const initialFormData: FormCardData = {
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
    houseNumber: 0,
    zip: 0,
  },
};

const isCardFormValid = (formData: FormCardData): boolean => {
  const errors = validateCardForm(formData);
  return Object.keys(errors).length === 0;
};

export { initialFormData, isCardFormValid };
