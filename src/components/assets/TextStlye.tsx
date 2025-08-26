type TitleProps = {
  content: string;
  dark?: boolean;
};

const Title = ({ content, dark = false }: TitleProps) => {
  return (
    <span
      className={`
        !mb-2 !mx-2 min-w-35 lg:min-w-40 text-lg sm:text-xl text-center font-bold uppercase tracking-widest cursor-default ${
          dark ? `text-indigo-800` : `text-white`
        }`}
    >
      {content}
    </span>
  );
};

export { Title };
