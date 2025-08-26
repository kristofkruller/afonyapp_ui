import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";
import Loading from "@/components/assets/Loading";
import { Orders } from "./Orders";
import { ActionBtn } from "../assets/Button";
import { useOrders } from "@/store/orders/useOrdersMutation";
import { useNavigate } from "react-router-dom";

const CostumerDash = () => {
  const { user, logout } = useAuthStore((s) => s);
  const { data, isLoading, error } = useOrders();
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="wrapper gap-2 [&>button]:text-base [&>button]:text-nowrap">
          <div
            id="logOut"
            className="fixed z-10 top-2 lg:top-5 right-5 max-w-10 scale-75 translate-x-[-175%] lg:translate-x-[-250%]"
          >
            <ActionBtn content="Kijelentkezem" onClick={logout} />
          </div>
          <Logo />
          <Title content={`Üdvözlünk ${user?.nick}!`} dark={true} />
          <ActionBtn content="Áfonyát rendelek" />
          <ActionBtn
            content="Profil szerkeztése"
            onClick={() => navigate("/profile")}
          />
          <h1 className="text-xl font-extrabold !py-2">Rendeléseim</h1>

          {!isLoading && error && <p>{`Hiba: ${error}`}</p>}

          {!isLoading && !error && data?.orders && data?.orders.length > 0 && (
            <Orders orders={data?.orders} />
          )}

          {!isLoading &&
            !error &&
            data?.orders &&
            data?.orders.length === 0 && <p>Nincs rendelésed</p>}
        </section>
      )}
    </>
  );
};

export default CostumerDash;
