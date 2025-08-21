import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";
import { useOrdersStore } from "@/store/orders/useOrdersStore";
import Loading from "@/components/assets/Loading";
import { Orders } from "./Orders";

const CostumerDash = () => {
  // const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { orders, loading, error, fetchOrders } = useOrdersStore((o) => o);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <section className="wrapper boneFull">
      <Logo />
      <Title content={`Üdvözlünk ${user?.nick}!`} dark={true} />

      <h1 className="text-xl font-extrabold !py-2">Rendeléseim</h1>
      {loading && <Loading />}

      {!loading && error && <p>{`Hiba: ${error}`}</p>}

      {!loading && !error && orders && orders.length > 0 && (
        <Orders orders={orders} />
      )}

      {!loading && !error && orders && orders.length === 0 && (
        <p>Nincs rendelésed</p>
      )}
    </section>
  );
};

export default CostumerDash;
