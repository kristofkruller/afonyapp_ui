import { useId } from "react";
import { ActionBtn } from "./Button";
import Logo from "./Logo";
import Sign from "./Sign";
import { Title } from "./TextStlye";
import { useUiStore } from "@/store/ui/useUiStore";

/**
 * Props for the PopUp component.
 */
export type PopUpProps = {
  /** The title displayed at the top of the popup. */
  title: string;
  /** The main content message of the popup. */
  content: string;
  /** An array of button properties to be rendered within the popup. */
  btnContent: BtnProp[];
  /** Optional: The name of a PNG image file (without extension) to display as a sign/icon. */
  sign?: string;
};

/**
 * A reusable modal/popup component that displays a title, content, and a set of action buttons.
 * It is controlled by the `useUiStore`'s `isPopUp` state, so in a component only togglePopUp
 * needed for this to be shown.
 *
 * @param {PopUpProps} { title, content, btnContent, sign } - Props for the component.
 * @returns {JSX.Element | null} The PopUp component if `isPopUp` is true, otherwise null.
 */
const PopUp = ({ title, content, btnContent = [], sign }: PopUpProps) => {
  const { isPopUp } = useUiStore();
  const id = useId();
  return (
    isPopUp && (
      <div
        id="info-popup"
        className="fixed flexCenterCol inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden"
      >
        <div className="relative flexCenterCol flex-nowrap w-full sm:max-w-lg h-full sm:h-auto bg-[var(--white)]/96 sm:rounded-3xl sm:shadow-2xl !p-4 sm:!p-10 gap-4">
          {!sign ? <Logo /> : <Sign png={sign} />}
          <div className="relative flexCenterCol">
            <div className="flexCenterCol gap-2">
              {title && <Title content={title} />}
              {content && <p className="text-center">{content}</p>}
            </div>
            {btnContent.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 !mt-8">
                {btnContent.map((content, i) => (
                  <ActionBtn
                    key={id + i}
                    content={content.content}
                    onClick={content.onClick}
                    disabled={content.disabled}
                    type={content.type}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default PopUp;
