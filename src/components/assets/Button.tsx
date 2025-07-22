const ActionBtn = ({ content, onClick, disabled }: BtnProp) => {
  const colors = {
    bool:
      disabled === true
      ? "bg-gray-400" 
      : content.toLowerCase().startsWith("bej")
      ? "bg-gray-700 dark:bg-white-200/60 hover:bg-gray-500/80 dark:hover:bg-gray-100/80 text-lg text-gray-300 hover:text-white dark:hover:text-indigo-500"
      : content.toLowerCase().startsWith("reg")
      ? "bg-indigo-800/20 hover:bg-indigo-400 hover:text-white text-gray-300 hover:border-indigo-300"
      : "bg-gray-800 hover:bg-gray-700 hover:text-white text-gray-300",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        `actionBtn ${!disabled ? "hover:actionAnimOp cursor-pointer border-2" : ""} !px-5 !py-3 relative block focus:outline-none rounded-xl w-35 lg:w-40
        lg:text-sm text-xs text-center font-semibold uppercase tracking-widest font-bold
        ${colors.bool}`}
    >
      {content}
    </button>
  );
};

export { ActionBtn };
