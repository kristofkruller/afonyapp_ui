type SignProp = {
  png: string;
};

const Sign = ({ png = "" }: SignProp) => {
  return !png ? (
    <></>
  ) : (
    <img
      src={`/${png}.png`}
      alt="alert sign or status icon"
      className="max-w-30 h-fit transition-all"
    />
  );
};

export default Sign;
