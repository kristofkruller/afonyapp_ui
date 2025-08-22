import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";
import { useOrdersStore } from "@/store/orders/useOrdersStore";
import Loading from "@/components/assets/Loading";
import { Orders } from "./Orders";
import { ActionBtn } from "../assets/Button";

const CostumerDash = () => {
  // const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { orders, loading, error, fetchOrders } = useOrdersStore((o) => o);
  const logOut = useAuthStore(s => s.logout);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
    {loading ? <Loading /> : (
      <section className="wrapper boneFull gap-2">
        <div id="logOut" className="fixed z-10 top-2 lg:top-5 right-5 max-w-10 scale-75 translate-x-[-175%] lg:translate-x-[-250%]">
          <ActionBtn content="Kijelentkezem" onClick={logOut}/>
        </div>
        <Logo />
        <Title content={`Üdvözlünk ${user?.nick}!`} dark={true} />
        <ActionBtn content="Áfonyát rendelek"/>
        <ActionBtn content="Profil szerkeztése"/>
        <h1 className="text-xl font-extrabold !py-2">Rendeléseim</h1>

        {!loading && error && <p>{`Hiba: ${error}`}</p>}

        {!loading && !error && orders && orders.length > 0 && (
          <Orders orders={orders} />
        )}

        {!loading && !error && orders && orders.length === 0 && (
          <p>Nincs rendelésed</p>
        )}
      </section>
    )}</>
  );
};

export default CostumerDash;
