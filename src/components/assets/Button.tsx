import { memo, useId } from "react";

const ActionBtn = ({
  content,
  onClick,
  disabled,
  type = "button",
}: BtnProp) => {
  const isImportant = (content: string): boolean => {
    const importantArr = ["regisztr", "megerősít", "rendel"];
    for (let index = 0; index < importantArr.length; index++) {
      const e = importantArr[index];
      if (content.trim().toLowerCase().indexOf(e) > -1) return true;
    }
    return false;
  };

  const colors = {
    bool:
      disabled === true
        ? "bg-indigo-400 opacity-50 text-indigo-800"
        : isImportant(content)
        ? "bg-indigo-800 border-indigo-800 hover:bg-indigo-600 hover:border-indigo-600 text-[var(--white)]"
        : "bg-indigo-50 hover:bg-indigo-100/60 border-indigo-800 text-indigo-800",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`actionBtn ${
        !disabled ? "hover:actionAnimOp cursor-pointer border-2" : ""
      } !p-3 relative block focus:outline-none rounded-3xl min-w-min
        text-xs text-center font-bold uppercase tracking-widest
        ${colors.bool}`}
    >
      {content}
    </button>
  );
};

// --- Input mező komponens (memozott!) ---
const FormInput = memo(
  ({
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    disabled = false,
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
        required={true}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
);

FormInput.displayName = "FormInput"; // memóhoz

export { ActionBtn, FormInput };
