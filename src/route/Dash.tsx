import { useEffect, useMemo } from "react";
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

  const tokenValid = useMemo(() => isTokenValid(), [isTokenValid]);
  const admin = useMemo(() => isAdmin(), [isAdmin]);

  /**
   * Ellenőrizzük a token érvényességét mountkor.
   * Ha nem valid, logout és redirect.
   */
  useEffect(() => {
    if (!tokenValid) {
      logout();
      navigate("/", { replace: true });
    }
  }, [tokenValid, logout, navigate]);

  // Ha még nincs user, vagy nick nem megfelelő, AskNick komponens
  if (!user || !user.nick || user.nick.trim().length < 3 && tokenValid) {
    return <AskNick />;
  }

  // Admin vs Costumer dashboard
  return admin ? <AdminDash /> : <CostumerDash />;
};

export default Dash;
