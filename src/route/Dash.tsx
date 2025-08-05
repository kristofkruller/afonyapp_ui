import AdminDash from '@/components/AdminDash';
import AskNick from '@/components/AskNick';
import CostumerDash from '@/components/CostumerDash';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isTokenValid = useAuthStore((state) => state.isTokenValid);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!isTokenValid) {
    logout();
    navigate('/');
    return;
  }

  if (!user?.nick || user.nick.trim() === "") {
    return <AskNick />;
  }

  return(
    <>
      {isAdmin() ? (<AdminDash />) : (<CostumerDash />)}
    </>
  )
}

export default Dash