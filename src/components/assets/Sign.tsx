type SignProp = {
  png: string;
};

/**
 * Pre styled icon to highlight status or importancy
 * @param png string a path to a png image without extension 
 * @returns 
 */
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
