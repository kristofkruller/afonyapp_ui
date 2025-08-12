import AdminDash from "@/components/AdminDash";
import AskNick from "@/components/AskNick";
import CostumerDash from "@/components/CostumerDash";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isTokenValid = useAuthStore((s) => s.isTokenValid);
  const isAdmin = useAuthStore((s) => s.isAdmin);

  useEffect(() => {
    if (!isTokenValid()) {
      logout();
      navigate("/");
      return;
    }
  });

  if (!user?.nick || user.nick.trim() === "") {
    console.warn(user);
    return <AskNick />;
  }

  return isAdmin() ? <AdminDash /> : <CostumerDash />;
};

export default Dash;
