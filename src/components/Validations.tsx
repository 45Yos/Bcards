import React from "react";

interface ValidationMessageProps {
  field: string;
  value: string | number | boolean | undefined;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  field,
  value,
}) => {
  const getMessage = () => {
    if (field === "phone" && typeof value === "string") {
      if (value.length === 0) return "Phone number is required";
      if (!value.startsWith("05")) return "Phone number must start with 05";
      if (value.length < 9 || value.length > 11)
        return "Phone number must be between 9 and 11 digits";
    }

    if (field === "first" && typeof value === "string") {
      if (value.length === 0) return "First name is required";
      if (value.length < 2) return "First name must be at least 2 characters";
    }

    if (field === "last" && typeof value === "string") {
      if (value.length === 0) return "Last name is required";
      if (value.length < 2) return "Last name must be at least 2 characters";
    }

    if (field === "password" && typeof value === "string") {
      if (value.length === 0) return "Password is required";
      else if (value.length < 9)
        return "Password must be at least 9 characters";
      else if (!/[A-Z]/.test(value)) return "Must contain an uppercase letter";
      else if (!/[a-z]/.test(value)) return "Must contain a lowercase letter";
      if (!/[0-9]/.test(value)) return "Must contain a number";
      if (!/[!@#$%^&*-]/.test(value))
        return "Must contain a special character (!@#$%^&*-)";
    }

    if (field === "email" && typeof value === "string") {
      if (value.length === 0) return "Email is required";
      if (value.length < 5 || !value.includes("@"))
        return "Enter a valid email";
    }

    if (field === "houseNumber" && typeof value === "string") {
      if (value.length <= 0) return "House number  is required";
    }

    if (field === "zip" && typeof value === "string") {
      if (value.length <= 0) return "ZIP code is required";
    }

    if (field === "city" && typeof value === "string") {
      if (value.length === 0) return "City is required";
      if (value.length < 2) return "City must be at least 2 characters";
    }

    if (field === "country" && typeof value === "string") {
      if (value.length === 0) return "Country is required";
      if (value.length < 2) return "Country must be at least 2 characters";
    }

    if (field === "street" && typeof value === "string") {
      if (value.length === 0) return "Street is required";
      if (value.length < 2) return "Street must be at least 2 characters";
    }

    if (field === "isBusiness" && typeof value === "boolean") {
      if (!value) return "You must select if you are a business or not";
    }

    return null;
  };

  const message = getMessage();

  return (
    <div className="relative w-full">
      {message && (
        <p className="absolute left-0 top-full mt-1 text-sm text-red-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default ValidationMessage;
