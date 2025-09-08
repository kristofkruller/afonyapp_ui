import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminDash from "@/components/user/admin/AdminDash";
import AskNick from "@/components/welcome/AskNick";
import CostumerDash from "@/components/user/costumer/CostumerDash";
import { useAuthStore } from "@/store/auth/useAuthStore";

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
  // console.log(user?.nick.length)
  if (!user?.nick || user.nick.trim() == '' || user.nick.length < 3) {
    return <AskNick />;
  }

  return isAdmin() ? <AdminDash /> : <CostumerDash />;
};

export default Dash;
