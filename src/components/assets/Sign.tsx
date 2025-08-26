type SignProp = {
  png: string;
};

const Sign = ({ png = "" }: SignProp) => {
  return !png ? (
    <></>
  ) : (
    <img
      src={`/${png}.png`}
      alt="alert icon"
      className="max-w-30 transition-all"
    />
  );
};

export default Sign;
