import { memo, useId } from "react";

const ActionBtn = ({ content, onClick, disabled, type = 'button' }: BtnProp) => {
  const colors = {
    bool:
      disabled === true
      ? "bg-indigo-400 opacity-50 text-indigo-800"
      : content.toLowerCase().startsWith("reg") || content.toLowerCase().startsWith("meger")
      ? "bg-indigo-800 border-indigo-800 hover:bg-indigo-600 hover:border-indigo-600 text-gray-200"
      : "bg-indigo-50 hover:bg-indigo-100/60 border-indigo-800 text-indigo-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        `actionBtn ${!disabled ? "hover:actionAnimOp cursor-pointer border-2" : ""} !px-6 !py-1 relative block focus:outline-none rounded-3xl min-w-35 lg:min-w-40
        lg:text-sm text-xs text-center font-bold uppercase tracking-widest
        ${colors.bool}`}
    >
      {content}
    </button>
  );
};

// --- Input mező komponens (memozott!) ---
const FormInput = memo(
  ({ name, type = "text", value, onChange, placeholder }: InputProps) => {
    const inputId = useId();

    return (
      <input
        className="bg-white/30 !px-3 hover:!px-4 !py-1 rounded-3xl text-center text-indigo-950 !caret-indigo-600"
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={true}
        placeholder={placeholder}
      />
    );
  }
);

FormInput.displayName = "FormInput"; // memóhoz

export { ActionBtn, FormInput };
