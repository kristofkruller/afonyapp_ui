import { useUiStore } from "@/store/ui/useUiStore";
import type { PopUpProps } from "@/components/assets/PopUp";
import { useUpdateUserNick } from "@/store/auth/useAuthMutation";
import { nickRegex } from "@/helpers";
import type { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCallback } from "react";

/**
 * Custom hook for handling user nickname (display name) updates.
 *
 * @param setPopUp - React state setter for configuring popup dialogs.
 * @param setError - React state setter for reporting validation or server errors.
 *
 * @returns A function that accepts a candidate nickname string.
 * - Performs client-side validation (regex, length, current value check).
 * - On success, opens a confirmation popup with action buttons.
 * - On confirmation, triggers mutation to backend.
 *
 * @example
 * ```tsx
 * const changeName = useChangeName(setPopUp, setError);
 *
 * <ActionBtn
 *   content="Név módosítása"
 *   onClick={() => changeName(newNick)}
 * />
 * ```
 */
const useChangeName = (
  setPopUp: React.Dispatch<React.SetStateAction<PopUpProps>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const { togglePopUp } = useUiStore();
  const userNickMutation = useUpdateUserNick();
  const { user } = useAuthStore((s) => s);

  /**
   * Handles nickname change confirmation.
   *
   * @param trimmedNick - The sanitized nickname string (trimmed and validated).
   * @internal
   */
  const handleConfirm = useCallback(
    (trimmedNick: string) => {
      userNickMutation.mutate(
        { nick: trimmedNick },
        {
          onSuccess: () => {
            console.debug(`nick ✅`);
            setError("");
          },
          onError: (error: AxiosError<ErrorResponse>) => {
            const msg =
              error?.response?.data &&
              typeof error.response.data.message === "string"
                ? error.response.data.message
                : "Ismeretlen hiba";
            setError(msg);
          },
        }
      );
      togglePopUp();
    },
    [setError, togglePopUp, userNickMutation]
  );

  /**
   * Handles user cancellation of nickname change.
   *
   * - Resets error state.
   * - Clears popup configuration.
   * - Closes the popup.
   *
   * @internal
   */
  const handleBack = () => {
    setError("");
    setPopUp({ title: "", content: "", btnContent: [] });
    togglePopUp();
  };

  /**
   * Entry point returned by the hook.
   * Validates and initializes nickname change flow.
   *
   * @param name - The raw input nickname string.
   *
   * @remarks
   * - Validates using regex: must be 3–24 chars, no special symbols.
   * - Prevents setting the same nickname as the current one.
   * - Opens confirmation popup if valid.
   */
  return (name: string) => {
    const trimmedNick = name.trim();
    if (!trimmedNick || !nickRegex.test(trimmedNick)) {
      setError(
        "Minimum 3, maximum 24 karaktert adj meg becenévként, speciális karakter nélkül!"
      );
      return;
    }
    if (trimmedNick == user?.nick) {
      setError("Az új neved nem egyezhet a jelenlegivel!");
      return;
    }

    togglePopUp();
    setPopUp({
      title: "Név megváltoztatása",
      content: `Az új appban használandó neved ${name}, kérlek erősítsd meg!`,
      btnContent: [
        {
          content: "Megerősítem",
          onClick: () => handleConfirm(trimmedNick),
        },
        {
          content: "Vissza",
          onClick: handleBack,
        },
      ],
    });
  };
};

export default useChangeName;
