import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "./assets/Logo";
import { Title } from "./assets/TextStlye";
import { useState } from "react";
import { AxiosError } from "axios";
import { ActionBtn, FormInput } from "./assets/Button";
import { InputError } from "./error/DashError";
import { useUpdateUserNick } from "@/store/auth/useAuthMutation";
import type { AuthErrorResponse } from "@/store/auth/types";

const AskNick = () => {
  const user = useAuthStore((s) => s.user);
  const [nickname, setNickname] = useState("");
  const nicknameRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9]{3,24}$/;
  const [error, setError] = useState("");
  const userNickMutation = useUpdateUserNick();

  const handleSubmit = async () => {
    const trimmedNick = nickname.trim();
    if (!trimmedNick || !nicknameRegex.test(trimmedNick)) {
      setError(
        "Minimum 3, maximum 24 karaktert adj meg becenévként, speciális karakter nélkül!"
      );
      return;
    }
    if (!user || !user.id) {
      setError("Hiba a felhasználó inicializálása közben");
      return;
    }
    userNickMutation.mutate(
      {
        nickname: trimmedNick
      },
      {
        onSuccess: () => console.debug(`nick ✅`),
        onError: (error: AxiosError<AuthErrorResponse>) => {
          const msg =
            error?.response?.data &&
            typeof error.response.data.message === "string"
              ? error.response.data.message
              : "Ismeretlen hiba";
          setError(msg);
        },
      }
    );
    // try {
    //   await axios.patch(`/api/users`, { nick: trimmedNick, id: user?.id });
    //   setError("");
    //   navigate('/dashboard');
    // } catch (err) {
    //   setError("Hiba történt a becenév frissítésekor");
    //   console.error("Hiba a nick frissítésekor", err);
    // }
  };

  return (
    <section className="wrapper gap-4 w-full">
      <Logo />
      <Title content={"Kérlek add meg hogy szólíthatunk!"} />
      <FormInput
        name="nickname"
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      {error && <InputError error={error} />}
      <ActionBtn content={"Beállítás"} onClick={handleSubmit} />
    </section>
  );
};

export default AskNick;
