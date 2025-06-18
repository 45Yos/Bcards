import { FloatingLabel } from "flowbite-react";
import ValidationMessage from "../Validations";
import { getNestedValue, getFieldKey } from "../formUtils";
import { inputFields } from "./SignUpFormFields";

type Props = {
  formData: Record<string, unknown>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getFieldColor: (field: string) => "error" | "success" | undefined;
};

export const SignUpFormInputs = ({
  formData,
  handleChange,
  getFieldColor,
}: Props) => (
  <>
    {inputFields.map(({ label, name, type = "text", required }) => (
      <div className="relative" key={name}>
        <FloatingLabel
          label={label}
          variant="filled"
          name={name}
          type={type}
          value={getNestedValue(formData, name)}
          onChange={handleChange}
          color={getFieldColor(getFieldKey(name))}
          required={required}
        />
        {required && (
          <ValidationMessage
            field={getFieldKey(name)}
            value={getNestedValue(formData, name)}
          />
        )}
      </div>
    ))}
  </>
);
export default SignUpFormInputs;
