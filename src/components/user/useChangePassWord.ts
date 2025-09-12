import type { AxiosError } from "axios";

import { useUiStore } from "@/store/ui/useUiStore";
import type { PopUpProps } from "../assets/PopUp";
import { useUpdateUserPassWord } from "@/store/auth/useAuthMutation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCallback } from "react";

/**
 * Custom hook for orchestrating the password change flow.
 *
 * Responsibilities:
 * - Shows a confirmation popup before executing the password change.
 * - On confirmation, triggers the mutation towards backend (via `useUpdateUserPassWord`).
 * - Handles API errors consistently and provides feedback to the user.
 * - Forces logout after successful password change to enforce re-authentication.
 *
 * Side effects:
 * - Updates UI state (`PopUp`, error messages).
 * - Calls global `logout` (via `useAuthStore`) on success.
 *
 * Why structured this way:
 * - Centralizes password-change logic to keep UI components lean.
 * - Using `useCallback` to avoid unnecessary re-creation of the confirm handler.
 */
const useChangePassWord = (
  setPopUp: React.Dispatch<React.SetStateAction<PopUpProps>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const { togglePopUp } = useUiStore();
  const updateUserPassWord = useUpdateUserPassWord();
  const logout = useAuthStore((s) => s.logout);

  /**
   * Executes the password update operation against the backend.
   * On success: closes popup + logs out.
   * On error: extracts a user-facing message from AxiosError and displays it.
   *
   * Notes:
   * - `mutateAsync` used instead of `mutate` for clearer async/await handling.
   * - Any API error is normalized to a string for display.
   */
  const handleConfirm = useCallback(
    async (originalPassWord: string, newPassWord: string) => {
      try {
        await updateUserPassWord.mutateAsync({
          originalPassWord,
          newPassWord,
        });
        console.debug("pass ✅");
        togglePopUp();
        logout();
      } catch (error) {
        const axiosErr = error as AxiosError<ErrorResponse>;
        const msg =
          axiosErr?.response?.data &&
          typeof axiosErr.response.data.message === "string"
            ? axiosErr.response.data.message
            : "Ismeretlen hiba";
        setError(msg);
        togglePopUp();
      }
    },
    [logout, setError, togglePopUp, updateUserPassWord]
  );

  /**
   * Resets the popup state and error message without performing any mutation.
   * Used when user cancels the operation.
   */
  const handleBack = () => {
    setError("");
    setPopUp({ title: "", content: "", btnContent: [] });
    togglePopUp();
  };

  /**
   * Entry point returned by the hook.
   * Displays the confirmation popup with two actions:
   * - Confirm → triggers `handleConfirm`
   * - Cancel → triggers `handleBack`
   *
   * Parameters:
   * - `originalPassWord`: user's current password (required for validation).
   * - `newPassWord`: user's desired new password.
   */
  return (originalPassWord: string, newPassWord: string) => {
    togglePopUp();
    setPopUp({
      title: "Jelszó csere",
      content:
        "Ha biztosan elküldöd, a jelszavad megváltozik, kijelentkeztetünk és az ujjal tudsz bejelentkezni legközelebb.",
      btnContent: [
        {
          content: "Megerősítem",
          onClick: () => handleConfirm(originalPassWord, newPassWord),
        },
        {
          content: "Vissza",
          onClick: handleBack,
        },
      ],
    });
  };
};

export default useChangePassWord;
