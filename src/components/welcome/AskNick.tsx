import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";
import { ActionBtn, FormInput } from "@/components/assets/Button";
import { InputError } from "@/components/error/DashError";
import { useUpdateUserNick } from "@/store/auth/useAuthMutation";
import { nickRegex } from "@/helpers";

const AskNick = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [nick, setNick] = useState("");
  const [error, setError] = useState("");
  const userNickMutation = useUpdateUserNick();

  const handleSubmit = async () => {
    const trimmedNick = nick.trim();
    if (!trimmedNick || !nickRegex.test(trimmedNick)) {
      setError(
        "Minimum 3, maximum 24 karaktert adj meg becenévként, speciális karakter nélkül!"
      );
      return;
    }
    if (!user || !user.id) {
      setNick("");
      setError(""); // Hiba a felhasználó inicializálása közben
      navigate("/unauthorized");
    }
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
  };

  return (
    <section className="wrapper gap-4 w-full">
      <Logo />
      <Title content={"Kérlek add meg hogy szólíthatunk!"} />
      <FormInput
        name="nick"
        type="text"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
      />
      {error && <InputError error={error} />}
      <ActionBtn content={"Beállítás"} onClick={handleSubmit} />
    </section>
  );
};

export default AskNick;
