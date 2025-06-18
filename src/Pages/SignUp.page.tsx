import { FloatingLabel, Checkbox, Button } from "flowbite-react";
import { useState } from "react";
import ValidationMessage from "../components/Validations";
import {
  FormData,
  getFieldColor,
  handleSubmit,
  initialFormData,
  isFormValid,
} from "./SignUpConstructions/Elements";

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const keys = name.split(".");

    if (keys.length === 1) {
      if (type === "checkbox") {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else if (keys.length === 2) {
      const key0 = keys[0] as keyof FormData;
      setFormData((prev) => ({
        ...prev,
        [key0]: {
          ...(typeof prev[key0] === "object" && prev[key0] !== null
            ? prev[key0]
            : {}),
          [keys[1]]: value,
        },
      }));
    }
  };

  const valid = isFormValid(formData);

  return (
    <div className="min-h-screen bg-gray-100 py-10 dark:bg-gray-800">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-10 shadow-md dark:bg-gray-700">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Sign Up
        </h1>

        <form
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          onSubmit={(e) => handleSubmit(e, formData)}
        >
          {[
            {
              label: "First Name",
              name: "name.first",
              required: true,
              type: "text",
              field: "first",
            },
            {
              label: "Middle Name",
              name: "name.middle",
              required: false,
              type: "text",
              field: "middle",
            },
            {
              label: "Last Name",
              name: "name.last",
              required: true,
              type: "text",
              field: "last",
            },
            {
              label: "Phone Number",
              name: "phone",
              required: true,
              type: "tel",
              field: "phone",
            },
            {
              label: "Email",
              name: "email",
              required: true,
              type: "email",
              field: "email",
            },
            {
              label: "Password",
              name: "password",
              required: true,
              type: "password",
              field: "password",
            },
            {
              label: "Image URL",
              name: "image.url",
              required: false,
              type: "url",
              field: "url",
            },
            {
              label: "Image Alt Text",
              name: "image.alt",
              required: false,
              type: "text",
              field: "alt",
            },
            {
              label: "State",
              name: "address.state",
              required: false,
              type: "text",
              field: "state",
            },
            {
              label: "Country",
              name: "address.country",
              required: true,
              type: "text",
              field: "country",
            },
            {
              label: "City",
              name: "address.city",
              required: true,
              type: "text",
              field: "city",
            },
            {
              label: "Street",
              name: "address.street",
              required: true,
              type: "text",
              field: "street",
            },
            {
              label: "House Number",
              name: "address.houseNumber",
              required: true,
              type: "number",
              field: "houseNumber",
            },
            {
              label: "ZIP Code",
              name: "address.zip",
              required: true,
              type: "number",
              field: "zip",
            },
          ].map(({ label, name, required, type, field }) => (
            <div key={name} className="relative">
              <FloatingLabel
                label={label}
                variant="filled"
                name={name}
                onChange={handleChange}
                color={getFieldColor(formData, field)}
                required={required}
                type={type}
                value={
                  name
                    .split(".")
                    .reduce(
                      (acc: unknown, key) =>
                        (acc as { [key: string]: unknown })[key],
                      formData,
                    ) as string
                }
              />
              <ValidationMessage
                field={field}
                value={
                  name
                    .split(".")
                    .reduce(
                      (acc: unknown, key) =>
                        (acc as { [key: string]: unknown })[key],
                      formData,
                    ) as string
                }
              />
            </div>
          ))}

          <div className="flex items-center gap-2 sm:col-span-2">
            <Checkbox
              id="isBusiness"
              name="isBusiness"
              checked={formData.isBusiness}
              onChange={handleChange}
            />
            <label
              htmlFor="isBusiness"
              className="w-1/3 text-sm text-gray-700 dark:text-gray-300"
            >
              Registering as a business
            </label>
          </div>

          <div className="mt-6 sm:col-span-2">
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              fullSized
              disabled={!valid}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
