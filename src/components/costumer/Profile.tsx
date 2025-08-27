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
    <main className="wrapper gap-2">
      
      <Logo />
      <Title content={"Profil szerkeztése"} dark={true} />
      <div className="flex [&>input]:text-start">
        <label className="whitespace-nowrap !p-2">E-mail:</label>
        <FormInput
          name="email"
          placeholder={user?.email}
          disabled={true}
          onChange={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex [&>input]:text-start">
        <label className="whitespace-nowrap !p-2">Jelszó:</label>
        <FormInput
          name="nick"
          placeholder={user?.nick}
          disabled={true}
          onChange={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex gap-2 w-full justify-between"><ActionBtn content="Jelszócsere" /><ActionBtn content="Név módosítása" /></div>
      <div className="flex gap-2 w-full justify-between"><ActionBtn content="Profil törlése" /><ActionBtn content="Vissza" /></div>
      
    </main>
  );
};

export default Profile;
