import { memo, useId } from "react";

/**
 * Important pre-styled memoized component to recieve data from user as an input. Used app-wide.
 *
 * @param name - string
 * @param type - string | undefined; (default: "text")
 * @param value - string | undefined;
 * @param onChange - (e: ChangeEvent<HTMLInputElement>) => void;
 * @param placeholder - string | undefined;
 * @param disabled -  boolean | undefined;
 * @param required -  boolean | undefined;
 */
const FormInput = memo(
  ({
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    disabled = false,
    required = true,
  }: InputProps) => {
    const inputId = useId();

    return (
      <input
        className={`bg-white/30 !px-3 !py-1 rounded-3xl text-center text-indigo-950 !caret-indigo-600 ${
          disabled ? "" : `hover:!px-4`
        }`}
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
);

FormInput.displayName = "FormInput"; // react devtools memóhoz

/**
 * Styled feedback if an input does not meet the requirements
 * 
 * @param error string 
 * @returns JSX.Element | null
 */
const InputError = ({ error }: { error?: string }) =>
  error ? <p className="err">{error}</p> : null;

export { FormInput, InputError };
