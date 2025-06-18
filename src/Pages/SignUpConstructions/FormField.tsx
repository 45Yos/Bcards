import { FloatingLabel } from "flowbite-react";
import ValidationMessage from "../../components/Validations";

interface Props {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
}: Props) => (
  <div className="relative">
    <FloatingLabel
      label={label}
      variant="filled"
      name={name}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      color={value ? "success" : "error"}
    />
    <ValidationMessage field={name} value={value} />
  </div>
);

export default FormField;
