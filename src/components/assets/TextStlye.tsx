import Sign from "./Sign";

interface TitleProps {
  content: string;
};

/**
 * Title represents the leading title of a page. Auto dark mode based on the background of the body.
 * @param content: string 
 */
const Title = ({ content }: TitleProps) => {
  const dark = document.body.classList.contains("animate-bg");
  return (
    <span
      className={`
        !mb-2 !mx-2 min-w-35 lg:min-w-40 text-xl text-center font-bold cursor-default normal-case ${
          !dark ? `text-indigo-800` : `text-white`
        }`}
    >
      {content}
    </span>
  );
};

interface WarningProps extends TitleProps {
  title: string;
  size?: "s" | "xl";
}

/**
 * Warningbox is a designed div to highlight important information with an alert sign
 * 
 * @param title string
 * @param content string inherited
 * @param size default "s", if "xl", takes width of 90vw with bigger font size etc.
 */
const WarningBox = ({ title, content, size = "s" }: WarningProps) => (
  <div className={`${size === "xl" ? '[&>img]:max-w-14 [&_*]:text-base max-w-screen s:max-w-[90vw]' : '[&>img]:max-w-8 [&_*]:text-xs xs:max-w-98'} profileForm flex-col s:flex-row justify-center items-center self-center !py-4 !px-8 gap-4 text-center s:[&_*]:text-start bg-indigo-200/60 s:rounded-3xl`}>
    <Sign png="alert_sign" />
    <aside>
      <h2 className="font-extrabold italic !mb-2">{title}</h2>
      <p>{content}</p>
    </aside>
  </div>
);

export { Title, WarningBox };
