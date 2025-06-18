// components/CheckboxField.tsx
import { Checkbox } from "flowbite-react";

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  required = false,
}: CheckboxFieldProps) => {
  return (
    <div className="flex items-center gap-2 sm:col-span-2">
      <Checkbox
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
      />
      <label
        htmlFor={name}
        className="w-1/3 text-sm text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
