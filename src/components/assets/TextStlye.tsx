type TitleProps = {
  content: string;
};

const Title = ({ content }: TitleProps) => {
  return (
    <span className="!mb-2 !mx-2 min-w-35 lg:min-w-40 text-xl text-center text-white font-bold uppercase tracking-widest cursor-default">
      {content}
    </span>
  );
};

export { Title };
