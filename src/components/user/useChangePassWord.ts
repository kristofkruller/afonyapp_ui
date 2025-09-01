import type { AxiosError } from "axios";

import { useUiStore } from "@/store/ui/useUiStore";
import type { PopUpProps } from "../assets/PopUp";
import { useUpdateUserPassWord } from "@/store/auth/useAuthMutation";
import { useAuthStore } from "@/store/auth/useAuthStore";

const useChangePassWord = (
  setPopUp: React.Dispatch<React.SetStateAction<PopUpProps>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const { togglePopUp } = useUiStore();
  const updateUserPassWord = useUpdateUserPassWord();
  const logout = useAuthStore((s) => s.logout);

  return (originalPassWord: string, newPassWord: string) => {
    togglePopUp();
    setPopUp({
      title: "Jelszó csere",
      content:
        "Ha biztosan elküldöd, a jelszavad megváltozik, kijelentkeztetünk és az ujjal tudsz bejelentkezni legközelebb.",
      btnContent: [
        {
          content: "Megerősítem",
          onClick: async () => {
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
        },
        {
          content: "Vissza",
          onClick: () => {
            setError("");
            setPopUp({ title: "", content: "", btnContent: [] });
            togglePopUp();
          },
        },
      ],
    });
  };
};

export default useChangePassWord;
