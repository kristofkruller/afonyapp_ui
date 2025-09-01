import { useUiStore } from "@/store/ui/useUiStore";
import type { PopUpProps } from "@/components/assets/PopUp";
import { useUpdateUserNick } from "@/store/auth/useAuthMutation";
import { nickRegex } from "@/helpers";
import type { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth/useAuthStore";

const useChangeName = (
  setPopUp: React.Dispatch<React.SetStateAction<PopUpProps>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const { togglePopUp } = useUiStore();
  const userNickMutation = useUpdateUserNick();
  const { user } = useAuthStore((s) => s);

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
          onClick: () => {
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

export default useChangeName;
