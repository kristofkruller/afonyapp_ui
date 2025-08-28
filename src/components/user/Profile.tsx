import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { Title } from "../assets/TextStlye";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { ActionBtn, FormInput } from "../assets/Button";
import Logo from "../assets/Logo";
import PopUp, { type PopUpProps } from "../assets/PopUp";
import { useUiStore } from "@/store/ui/useUiStore";
import { useUpdateUserNick } from "@/store/auth/useAuthMutation";
import { nickRegex } from "../welcome/AskNick";
import { InputError } from "../error/DashError";

const Profile = () => {
  const navigate = useNavigate();
  const { token, user } = useAuthStore((s) => s);

  useEffect(() => {
    if (!token || !user) navigate("/unauthorized");
  }, [token, user, navigate]);

  const [error, setError] = useState("");

  // POPUP
  const [popUp, setPopUp] = useState<PopUpProps>({
    title: "",
    content: "",
    btnContent: [],
  });
  const { togglePopUp } = useUiStore();
  const userNickMutation = useUpdateUserNick();

  const [nick, setNick] = useState("");
  const changeName = (name: string) => {
    const trimmedNick = name.trim();
    if (!trimmedNick || !nickRegex.test(trimmedNick)) {
      setError(
        "Minimum 3, maximum 24 karaktert adj meg becenévként, speciális karakter nélkül!"
      );
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
              {
                nick: trimmedNick,
              },
              {
                onSuccess: () => console.debug(`nick ✅`),
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

  return (
    <>
      <PopUp
        title={popUp.title}
        content={popUp.content}
        btnContent={popUp.btnContent}
        sign="alert_sign"
      />
      <div className="logOut translate-x-[-45%] s:translate-x-[-80%] lg:translate-x-[-160%]">
        <ActionBtn content="Vissza" onClick={() => navigate("/dashboard")} />
      </div>
      <main
        className="flex flex-col justify-start s:justify-center
      items-center gap-2 max-w-screen xs:max-w-90"
      >
        <Logo />
        <Title content={"Profil szerkeztése"} dark={true} />
        <FormInput
          name="email"
          placeholder={user?.email}
          disabled={true}
          onChange={(e) => e.preventDefault()}
        />
        <div
          className="flex justify-center w-screen s:w-full
        [&>input]:text-start [&>input]:max-w-50 s:[&>input]:max-w-none [&>input]:border-1 [&>input]:border-indigo-800 [&>input]:!mr-4"
        >
          <label className="whitespace-nowrap !pl-4 !pr-1 !py-2">Név:</label>
          <FormInput
            name="nick"
            placeholder={user?.nick}
            disabled={false}
            value={nick}
            onChange={(e) => setNick(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-center">
            <InputError error={error} />
          </div>
        )}
        <div
          className="max-w-full flex flex-wrap s:flex-row gap-2 justify-center s:justify-around
        [&>button]:text-nowrap [&>button]:w-20 s:[&>button]:w-40 [&>button:last-of-type]:bg-rose-800
        [&>button:last-of-type]:text-[var(--white)] [&>button:last-of-type]:border-none"
        >
          <ActionBtn content="Jelszócsere" />
          <ActionBtn
            content="Név módosítása"
            onClick={() => changeName(nick)}
          />
          <ActionBtn content="Profil törlése" />
        </div>
      </main>
    </>
  );
};

export default Profile;
