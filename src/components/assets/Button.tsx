import { memo, useId } from "react";

const ActionBtn = ({ content, onClick, disabled, type = 'button' }: BtnProp) => {
  const colors = {
    bool:
      disabled === true
      ? "bg-indigo-400 opacity-50 text-indigo-700"
      : content.toLowerCase().startsWith("reg")
      ? "bg-indigo-800/70 hover:bg-indigo-400 hover:border-indigo-300 text-gray-200"
      : "hover:bg-gray-200/60 border-indigo-700 text-indigo-700",
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
        className="bg-white/30 !px-3 hover:!px-4 !py-1 rounded-3xl text-center text-indigo-900 !caret-indigo-500"
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
