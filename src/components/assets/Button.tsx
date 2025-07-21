const ActionBtn = ({ content, onClick }: BtnProp) => {
  const colors = {
    bool: content.toLowerCase().startsWith("bej")
      ? "bg-gray-700 dark:bg-white-200/60 hover:bg-gray-500/80 dark:hover:bg-gray-100/80 text-lg text-gray-300 hover:text-white dark:hover:text-indigo-500"
      : content.toLowerCase().startsWith("reg")
      ? "bg-indigo-800/20 hover:bg-indigo-400 hover:text-white text-gray-300 hover:border-indigo-300"
      : "bg-gray-800 hover:bg-gray-700 hover:text-white text-gray-300",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`actionBtn hover:actionAnimOp px-5 py-3 relative block focus:outline-none border-2 rounded-lg w-35
        text-sm text-center font-semibold uppercase tracking-widest font-bold
        ${colors.bool}`}
    >
      {content}
    </button>
  );
};

export { ActionBtn };
