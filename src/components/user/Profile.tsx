import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Title } from "@/components/assets/TextStlye";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { ActionBtn, FormInput } from "@/components/assets/Button";
import Logo from "@/components/assets/Logo";
import PopUp, { type PopUpProps } from "@/components/assets/PopUp";
import { InputError } from "@/components/error/DashError";
import useChangeName from "./useChangeName";
import useChangePassWord from "./useChangePassWord";
import { strongPasswordRegex } from "@/helpers";
import { useDeleteUser } from "@/store/auth/useAuthMutation";
import { useUiStore } from "@/store/ui/useUiStore";

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
  const delContent: PopUpProps = {
    title: "Felhasználó törlése",
    content:
      "Kérlek erősítsd meg hogy törlöd a profilod. Ez végérvényesen le fog mondani minden rögzített rendelést is!",
    btnContent: [
      {
        content: "Törlés",
        onClick: () => {
          setDel(true);
          deleteUser.mutate(undefined, {
            onSuccess: () => {
              togglePopUp();
              setPopUp({ title: "", content: "", btnContent: [] });
              logout();
            },
          });
        },
      },
      {
        content: "Mégse",
        onClick: () => {
          togglePopUp();
          setPopUp({ title: "", content: "", btnContent: [] });
        },
      },
    ],
  };

  const changePassWord = useChangePassWord(setPopUp, setError);

  // AUTHGUARD
  if ((!token || !user) && !passOn && !del) {
    return <Navigate to="/unauthorized" replace />;
  }

  const resetStates = () => {
    setNick("");
    setOriginalPassWord("");
    setPassWord("");
    setPassWordConfirm("");
    setError("");
    setPopUp({ title: "", content: "", btnContent: [] });
    if (passOn) setPassOn(false);
  };

  const changePassWordHandler = () => {
    if (passWord === passWordConfirm) {
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
      return;
    } else {
      setError("A megadott jelszavak eltérnek!");
      return;
    }
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
        <ActionBtn
          content="Vissza"
          onClick={() => {
            if (passOn) togglePassOn();
            resetStates();
            navigate("/dashboard");
          }}
        />
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
              onChange={(e) => setNick(e.target.value)}
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
                onChange={(e) => setOriginalPassWord(e.target.value)}
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
                onChange={(e) => setPassWord(e.target.value)}
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
                onChange={(e) => setPassWordConfirm(e.target.value)}
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
            <ActionBtn
              content="Jelszócsere"
              onClick={() => {
                setError("");
                togglePassOn();
              }}
            />
          ) : (
            <ActionBtn
              content="Megerősítés"
              onClick={() => changePassWordHandler()}
            />
          )}
          {!passOn ? (
            <ActionBtn
              content="Név módosítása"
              onClick={() => {
                if (passOn) togglePassOn();
                changeName(nick);
              }}
            />
          ) : (
            <ActionBtn
              content="Mégse"
              onClick={() => {
                setError("");
                togglePassOn();
              }}
            />
          )}
          {!passOn && (
            <ActionBtn
              content="Profil törlése"
              onClick={() => {
                setPopUp(delContent);
                togglePopUp();
              }}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;
