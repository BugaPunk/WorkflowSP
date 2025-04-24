import { useRef, useEffect } from "preact/hooks";
import { JSX } from "preact";

interface TextInputProps extends Omit<JSX.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  autofocus?: boolean;
  error?: string;
  className?: string;
}

export default function TextInput({
  value = "",
  onChange,
  type = "text",
  id,
  name,
  placeholder,
  required,
  autofocus,
  error,
  className = "",
  ...props
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Equivalente a onMounted en Vue
  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Manejador de cambios
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    onChange?.(target.value);
  };

  // Clases base y condicionales
  const baseClasses = "w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm px-3 py-1.5 text-base";
  const errorClasses = error ? "border-red-500" : "";
  const combinedClasses = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        className={combinedClasses}
        onInput={handleInput}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <span className="material-symbols-outlined text-sm mr-1">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

// Método para exponer la función focus
TextInput.focus = (ref: { current: HTMLInputElement | null }) => {
  ref.current?.focus();
};
