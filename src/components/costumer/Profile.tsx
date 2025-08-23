import { useNavigate } from "react-router-dom";
import { Title } from "../assets/TextStlye";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { ActionBtn, FormInput } from "../assets/Button";
import Logo from "../assets/Logo";

const Profile = () => {
  const navigate = useNavigate();
  const { token, user } = useAuthStore((s) => s);

  useEffect(() => {
    if (!token || !user) navigate("/unauthorized");
  }, [token, user, navigate]);

  return (
    <section className="wrapper gap-2">
      <Logo />
      <Title content={"Profil szerkeztése"} dark={true} />
      <div className="flex flex-row justify-center">
        <h1 className="whitespace-nowrap !p-2">E-mail:</h1>
        <FormInput
          name="email"
          placeholder={user?.email}
          disabled={true}
          onChange={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex flex-row">
        <h1 className="whitespace-nowrap !p-2">Megjelenített név:</h1>
        <FormInput
          name="nick"
          placeholder={user?.nick}
          disabled={true}
          onChange={(e) => e.preventDefault()}
        />
      </div>
      <ActionBtn content="Jelszócsere" />
      <ActionBtn content="Név módosítása" />
      <ActionBtn content="Profil törlése" />
      <ActionBtn content="Vissza" />
    </section>
  );
};

export default Profile;
