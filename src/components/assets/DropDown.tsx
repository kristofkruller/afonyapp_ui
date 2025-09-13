import { memo, useCallback, useState } from "react";

type DropDownContent = {
  id: string;
  content: string;
};
type DropDownProps = {
  /**
   * List of dropdown options to render.
   * First element is displayed as the default / selected value.
   */
  contents: DropDownContent[];

  /**
   * Callback triggered when user selects an option.
   * @param id: string - The ID of the selected option.
   */
  onSelect: (id: string) => void; // store setter
};

/**
 * Reusable dropdown component.
 *
 * - Displays the first item as selected by default.
 * - Clicking toggles dropdown open/close state.
 * - Non-selected items are hidden unless the dropdown is open.
 * - Calls `onSelect` when a user clicks an option.
 *
 * @remarks
 * Memoized to avoid re-renders when the first item's ID does not change.
 */
const DropDown = memo(
  ({ contents, onSelect }: DropDownProps) => {

    const [isOpen, setOpen] = useState(false);
    const handleOpen = useCallback(() => {
      setOpen((prev) => !prev);
    }, []);

    /**
     * Handles selection of a dropdown item.
     */
    const handleSelection = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const id = (e.target as HTMLElement).id;
        onSelect(id);
      },
      [onSelect]
    );

    return (
      <section
        onClick={handleOpen}
        className="cursor-pointer bg-white/30 !pr-7 !pl-4 !py-1
          text-start max-w-50 s:max-w-none
          border-indigo-800 border-1 rounded-3xl 
          text-center text-indigo-950 !caret-indigo-600 
          opacity-80"
      >
        {contents.map(({ id, content }, i) => (
          <div
            key={id}
            id={String(id)}
            className={`${i === 0 ? "opacity-100" : "opacity-50"} ${
              !isOpen && i !== 0 ? "hidden" : "block"
            }`}
            onClick={handleSelection}
          >
            {content}
            {i === 0 && (
              <span
                className={`absolute ${
                  isOpen ? "rotate-90" : "rotate-180"
                } !ml-2`}
              >
                {">"}
              </span>
            )}
          </div>
        ))}
      </section>
    );
  },
  /**
   * Custom memo comparison: only rerender if the first item's ID changes.
   */
  (prev, next) => prev.contents[0]?.id === next.contents[0]?.id
);

DropDown.displayName = "DropDown"; // react devtools memóhoz

export default DropDown;
