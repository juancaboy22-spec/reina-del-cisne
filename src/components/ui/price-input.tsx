import { Input } from "./input";

interface PriceInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function PriceInput({ id, value, onChange, required }: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mantener solo números
    const numericValue = e.target.value.replace(/\D/g, "");
    onChange(numericValue);
  };

  // Formatear para mostrar (con puntos cada mil)
  const formatDisplay = (val: string) => {
    if (!val) return "";
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="relative">
      <Input
        id={id}
        required={required}
        type="text"
        inputMode="numeric"
        value={formatDisplay(value)}
        onChange={handleChange}
        placeholder="0"
        className="pr-12"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
        USD
      </span>
    </div>
  );
}
