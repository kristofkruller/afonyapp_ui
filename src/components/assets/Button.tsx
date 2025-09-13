/**
 * ActionBtn - A reusable button component with a uniform style.
 *
 * Features:
 * - Dynamically handles coloring based on "isImportant" keywords
 * - Disables interaction and dims the button when disabled
 * - Hover animation and responsive styling
 *
 * @param content - The button's caption
 * @param onClick - Event handler for the click
 * @param disabled - Boolean value that disables the button
 * @param type - HTML button type (default: "button")
 */
const ActionBtn = ({
  content,
  onClick,
  disabled,
  type = "button",
}: BtnProp) => {
  const isImportant = (content: string): boolean => {
    const importantArr = [
      "regisztr",
      "megerősít",
      "rendel",
      "módosít",
      "csere",
    ];
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

export { ActionBtn };
