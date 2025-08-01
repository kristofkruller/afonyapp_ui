const ActionBtn = ({ content, onClick, disabled }: BtnProp) => {
  const colors = {
    bool:
      disabled === true
      ? "bg-gray-400 opacity-70" 
      : content.toLowerCase().startsWith("bej")
      ? "bg-gray-700 dark:bg-white-200/60 hover:bg-gray-500/80 dark:hover:bg-gray-100/80 text-lg hover:text-white dark:hover:text-indigo-500"
      : content.toLowerCase().startsWith("reg")
      ? "bg-indigo-800/70 hover:bg-indigo-400 hover:border-indigo-300"
      : "bg-gray-400 hover:bg-gray-300",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        `actionBtn ${!disabled ? "hover:actionAnimOp cursor-pointer border-2" : ""} !px-5 !py-3 relative block focus:outline-none rounded-xl min-w-35 lg:min-w-40
        lg:text-sm text-xs text-center text-white font-semibold uppercase tracking-widest
        ${colors.bool}`}
    >
      {content}
    </button>
  );
};

export { ActionBtn };
