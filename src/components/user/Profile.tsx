import { useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Title } from "@/components/assets/TextStlye";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { ActionBtn } from "@/components/assets/Button";
import { FormInput, InputError } from "@/components/assets/Input";
import Logo from "@/components/assets/Logo";
import PopUp, { type PopUpProps } from "@/components/assets/PopUp";
import useChangeName from "./useChangeName";
import useChangePassWord from "./useChangePassWord";
import { strongPasswordRegex } from "@/helpers";
import { useDeleteUser } from "@/store/auth/useAuthMutation";
import { useUiStore } from "@/store/ui/useUiStore";

/**
 * Profile page for authenticated users.
 *
 * Responsibilities:
 * - Displays user account data (email, nickname).
 * - Enables changing nickname and password.
 * - Supports account deletion with confirmation flow.
 * - Provides guard against unauthenticated access.
 *
 * Implementation notes:
 * - Centralizes all inline event handlers into dedicated functions for clarity.
 * - Uses `PopUp` to confirm destructive actions (password change, deletion).
 * - Enforces password strength policy with regex check.
 */
const Profile = () => {
  const navigate = useNavigate();
  const { togglePopUp } = useUiStore();
  const { user, token, logout } = useAuthStore((s) => s);

  const [error, setError] = useState("");

  // POPUP
  const [popUp, setPopUp] = useState<PopUpProps>({
    title: "",
    content: "",
    btnContent: [],
  });

  // NICKNAME
  const [nick, setNick] = useState("");
  const changeName = useChangeName(setPopUp, setError);

  // PASS
  const [originalPassWord, setOriginalPassWord] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordConfirm, setPassWordConfirm] = useState("");
  const [passOn, setPassOn] = useState(false);
  const togglePassOn = () => setPassOn(!passOn);

  // DEL
  const deleteUser = useDeleteUser();
  const [del, setDel] = useState(false);
  const handleDel = () => {
    setDel(true);
    deleteUser.mutate(undefined, {
      onSuccess: () => {
        togglePopUp();
        setPopUp({ title: "", content: "", btnContent: [] });
        logout();
      },
    });
  };
  const handleCancel = () => {
    togglePopUp();
    setPopUp({ title: "", content: "", btnContent: [] });
  };

  /**
   * Predefined popup config for account deletion.
   * Includes confirmation and cancel actions.
   */
  const delContent: PopUpProps = {
    title: "Felhasználó törlése",
    content:
      "Kérlek erősítsd meg hogy törlöd a profilod. Ez végérvényesen le fog mondani minden rögzített rendelést is!",
    btnContent: [
      {
        content: "Törlés",
        onClick: handleDel,
      },
      {
        content: "Mégse",
        onClick: handleCancel,
      },
    ],
  };

  const changePassWord = useChangePassWord(setPopUp, setError);

  // HANDLERS

  /** Navigates back to dashboard and resets local state. */
  const handleBack = () => {
    if (passOn) togglePassOn();
    resetStates();
    navigate("/dashboard");
  };

  /** Initiates password change popup with validation. */
  const handlePassChange = () => {
    setError("");
    togglePassOn();
  };

  /** Confirms new password with validation rules applied. */
  const handlePassConfirm = () => {
    if (passWord !== passWordConfirm) {
      setError("A megadott jelszavak eltérnek!");
      return;
    }
    if (
      !strongPasswordRegex.test(passWordConfirm) ||
      !strongPasswordRegex.test(originalPassWord)
    ) {
      setError(
        "A jelszónak tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert"
      );
      return;
    }
    changePassWord(originalPassWord, passWordConfirm);
  };

  /** Cancels password change flow. */
  const handlePassCancel = () => {
    setError("");
    togglePassOn();
  };

  /** Requests nickname change. */
  const handleNameChange = () => {
    if (passOn) togglePassOn();
    changeName(nick);
  };

  /** Initiates account deletion popup. */
  const handleDelete = () => {
    setPopUp(delContent);
    togglePopUp();
  };

  /** Resets component states to initial values. */
  const resetStates = () => {
    setNick("");
    setOriginalPassWord("");
    setPassWord("");
    setPassWordConfirm("");
    setError("");
    setPopUp({ title: "", content: "", btnContent: [] });
    if (passOn) setPassOn(false);
  };

  // INPUT HANDLERS (memo-zott FormInput-hoz)
  const handleNickChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNick(e.target.value),
    []
  );
  const handleOriginalPassChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setOriginalPassWord(e.target.value),
    []
  );
  const handlePassChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setPassWord(e.target.value),
    []
  );
  const handlePassConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassWordConfirm(e.target.value),
    []
  );

  // AUTH GUARD
  if ((!token || !user) && !passOn && !del) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <PopUp
        title={popUp.title}
        content={popUp.content}
        btnContent={popUp.btnContent}
        sign="alert_sign"
      />
      <div className="logOut translate-x-[-45%] s:translate-x-[-80%] lg:translate-x-[-160%]">
        <ActionBtn content="Vissza" onClick={handleBack} />
      </div>
      <main
        className="flex flex-col justify-start s:justify-center
        items-center gap-2 max-w-screen xs:max-w-90"
      >
        <Logo />
        <Title content={"Profil szerkesztése"} />
        <FormInput
          name="email"
          placeholder={user?.email}
          disabled={true}
          onChange={(e) => e.preventDefault()}
        />
        {!passOn ? (
          <div className="profileForm">
            <label className="whitespace-nowrap !pl-4 !pr-1 !py-2">Név:</label>
            <FormInput
              name="nick"
              placeholder={user?.nick}
              disabled={false}
              value={nick}
              onChange={handleNickChange}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="profileForm flex-col s:flex-row items-center s:justify-between !ml-4 s:!ml-0">
              <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                Jelenlegi jelszó:
              </label>
              <FormInput
                name="pass"
                type="password"
                placeholder="x x x x x"
                disabled={false}
                value={originalPassWord}
                onChange={handleOriginalPassChange}
              />
            </div>
            <div className="profileForm flex-col s:flex-row items-center s:justify-between !ml-4 s:!ml-0">
              <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                Új jelszó:
              </label>
              <FormInput
                name="newPass"
                type="password"
                placeholder="o o o o o"
                disabled={false}
                value={passWord}
                onChange={handlePassChangeInput}
              />
            </div>
            <div className="profileForm flex-col s:flex-row items-center s:justify-between !ml-4 s:!ml-0">
              <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                Új jelszó ismét:
              </label>
              <FormInput
                name="newPassConfirm"
                type="password"
                placeholder="o o o o o"
                disabled={false}
                value={passWordConfirm}
                onChange={handlePassConfirmChange}
              />
            </div>
          </div>
        )}
        {error && (
          <div className="text-center">
            <InputError error={error} />
          </div>
        )}
        <div
          className="max-w-full flex flex-wrap s:flex-row gap-2 justify-center s:justify-around
          [&>button]:text-nowrap [&>button]:w-20 s:[&>button]:w-40 [&>button:last-of-type]:bg-rose-800
          [&>button:last-of-type]:text-[var(--white)] [&>button:last-of-type]:border-none !my-4"
        >
          {!passOn ? (
            <ActionBtn content="Jelszócsere" onClick={handlePassChange} />
          ) : (
            <ActionBtn content="Megerősítés" onClick={handlePassConfirm} />
          )}
          {!passOn ? (
            <ActionBtn content="Név módosítása" onClick={handleNameChange} />
          ) : (
            <ActionBtn content="Mégse" onClick={handlePassCancel} />
          )}
          {!passOn && (
            <ActionBtn content="Profil törlése" onClick={handleDelete} />
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
