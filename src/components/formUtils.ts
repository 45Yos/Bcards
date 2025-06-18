export const getNestedValue = (obj: any, path: string): string =>
  path
    .split(".")
    .reduce(
      (o, key) =>
        o && typeof o === "object" ? (o as Record<string, unknown>)[key] : "",
      obj,
    ) as string;

export const getFieldKey = (name: string): string => name.split(".").pop()!;

export const isFormValid = (formData: FormData): boolean => {
  return (
    formData.name.first.length >= 2 &&
    formData.name.last.length >= 2 &&
    formData.phone.startsWith("05") &&
    formData.phone.length >= 9 &&
    formData.phone.length <= 11 &&
    formData.email.includes("@") &&
    formData.email.length >= 5 &&
    formData.password.length >= 7 &&
    formData.password.length <= 20 &&
    formData.address.country.length >= 2 &&
    formData.address.city.length >= 2 &&
    formData.address.street.length >= 2 &&
    Number(formData.address.houseNumber) > 0 &&
    Number(formData.address.zip) > 0
  );
};

interface FormData {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image: {
    url?: string;
    alt?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string | number;
    zip: string | number;
  };
}

export const getFieldColor = (
  field: string,
  formData: FormData,
): "error" | "success" | undefined => {
  const map: Record<string, string> = {
    first: formData.name.first,
    middle: formData.name.middle ?? "",
    last: formData.name.last,
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
    url: formData.image.url ?? "",
    alt: formData.image.alt ?? "",
    state: formData.address.state ?? "",
    country: formData.address.country,
    city: formData.address.city,
    street: formData.address.street,
    houseNumber: String(formData.address.houseNumber),
    zip: String(formData.address.zip),
  };

  const value = map[field];

  switch (field) {
    case "first":
    case "last":
    case "country":
    case "city":
    case "street":
      if (typeof value !== "string" || value.length === 0) return undefined;
      return value.length >= 2 ? "success" : "error";

    case "phone":
      if (typeof value !== "string" || value.length === 0) return undefined;
      return value.startsWith("05") && value.length > 9 && value.length < 11
        ? "success"
        : "error";

    case "email":
      if (typeof value !== "string" || value.length === 0) return undefined;
      return value.includes("@") && value.length >= 5 ? "success" : "error";

    case "password": {
      if (typeof value !== "string" || value.length === 0) return undefined;
      const isValidPassword =
        value.length >= 9 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*-]/.test(value);
      return isValidPassword ? "success" : "error";
    }

    case "houseNumber":
    case "zip":
      if (value === "") return undefined;
      return Number(value) > 0 ? "success" : "error";

    default:
      return undefined;
  }
};
