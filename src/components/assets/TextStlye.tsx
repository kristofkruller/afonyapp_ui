type TitleProps = {
  content: string;
};

const Title = ({ content }: TitleProps) => {
  const dark = document.body.classList.contains("animate-bg");
  return (
    <span
      className={`
        !mb-2 !mx-2 min-w-35 lg:min-w-40 text-2xl text-center font-bold capitalize cursor-default ${
          !dark ? `text-indigo-800` : `text-white`
        }`}
    >
      {content}
    </span>
  );
};

export { Title };
