import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";
import Loading from "@/components/assets/Loading";
import { Orders } from "./Orders";
import { ActionBtn } from "@/components/assets/Button";
import { useOrders } from "@/store/orders/useOrdersMutation";
import { useNavigate } from "react-router-dom";

/**
 * Customer dashboard page.
 *
 * Responsibilities:
 * - Displays a welcome message for the logged-in user.
 * - Allows navigating to profile and order creation pages.
 * - Shows a list of the user's previous orders.
 * - Handles logout flow.
 *
 * Implementation notes:
 * - Loading and error states are handled centrally.
 * - Action button handlers extracted for clarity.
 * - Conditional rendering simplified for readability.
 */
const CostumerDash = () => {
  const { user, logout } = useAuthStore((s) => s);
  const { data, isLoading, error } = useOrders();

  const navigate = useNavigate();
  /** Navigate to order creation page. */
  const handleNavOrder = () => navigate("/order");
  /** Navigate to user profile page. */
  const handleNavProfile = () => navigate("/profile");

  /** Conditional rendering helper for orders section. */
  const renderOrders = () => {
    if (error) return <h1>{`Hiba: ${error}`}</h1>;

    if (!data?.orders || data.orders.length === 0)
      return <h1>Nincs rendelésed</h1>;

    return (
      <>
        <h1>Rendeléseim</h1>
        <Orders orders={data.orders} />
      </>
    );
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  }

  if (isLoading) return <Loading />;

  return (
    <section className="wrapper gap-2 [&>button]:text-base [&>button]:text-nowrap [&_h1]:text-xl [&_h1]:font-extrabold [&_h1]:!py-2">
      <div className="logOut translate-x-[-135%] md:translate-x-[-175%] lg:translate-x-[-250%]">
        <ActionBtn content="Kijelentkezem" onClick={handleLogOut} />
      </div>
      <Logo />
      <Title content={`Üdvözlünk ${user?.nick}!`} />
      <ActionBtn content="Áfonyát rendelek" onClick={handleNavOrder} />
      <ActionBtn content="Profil szerkesztése" onClick={handleNavProfile} />
      {renderOrders()}
    </section>
  );
};

export default CostumerDash;
