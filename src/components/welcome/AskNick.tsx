import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";
import { ActionBtn } from "@/components/assets/Button";
import { FormInput, InputError } from "@/components/assets/Input";
import { useUpdateUserNick } from "@/store/auth/useAuthMutation";
import { nickRegex } from "@/helpers";

/**
 * AskNick Component
 *
 * This component is displayed when a new user needs to set their nickname for the first time.
 * It provides an input field for the nickname, performs client-side validation,
 * and then sends the nickname to the backend for storage.
 * If the user is not properly authenticated or an error occurs, it handles navigation and error display.
 */
const AskNick = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [nick, setNick] = useState("");
  const [error, setError] = useState("");
  const userNickMutation = useUpdateUserNick();

  /**
   * Handles the submission of the nickname form.
   * Performs client-side validation for the nickname.
   * If valid, it triggers the `userNickMutation` to update the user's nickname on the backend.
   */
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
      /**
       * Clears any existing error message.
       * Navigates the user to the unauthorized page if the user object is not properly initialized.
       * This typically indicates an authentication issue or a missing user ID.
       */
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
    <section className="wrapper gap-4 w-full [&>input]:border-1 [&>input]:border-indigo-800">
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
