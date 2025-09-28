// import React from "react";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useOrders } from "@/store/orders/useOrdersMutation";
import { useNavigate } from "react-router-dom";
import { Orders } from "../costumer/Orders";
import Loading from "@/components/assets/Loading";
import { ActionBtn } from "@/components/assets/Button";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";
import { Crops } from "./Crops";
import DropDown from "@/components/assets/DropDown";
import { useCrops } from "@/store/crops/useCropsMutation";

const AdminDash = () => {
  const { user, logout } = useAuthStore((s) => s);
  const orders = useOrders();
  const crops = useCrops();

  const navigate = useNavigate();

  const handleAddCrops = () => {};
  const handleSetDelivery = () => {};
  const handleSetAmounts = () => {};

  /** Conditional rendering helpers */
  const renderCrops = () => {
    const { data, error } = crops;
    if (!data?.crops || data.crops.length === 0)
      return <h1>Nincsenek felvett virtuális termések</h1>;
    if (error) return <h1>{`Hiba: ${error.message}`}</h1>;


    const cropsData = data.crops.map(crop => {
      let status = "";
      const endDate = new Date(crop.available_end).getTime();
      const now = Date.now();

      if (now > endDate || crop.available_amount > 0) {
        status = "Elérhető";
      } else {
        status = "Lejárt";
      }

      // content as status of availability
      return ({
        id: String(crop.id),
        content: status,
      })
    });
    return (
      <>
        <h1>Virtuális termések</h1>
        <DropDown contents={cropsData} onSelect={selectCrop} />
        <Crops crops={data.crops} />
      </>
    );
  };

  const renderOrders = () => {
    const { data, error } = orders;
    if (!data?.orders || data.orders.length === 0)
      return <h1>Nincsenek leadott rendelések</h1>;
    if (error) return <h1>{`Hiba: ${error.message}`}</h1>;
    return (
      <>
        <h1>Rendelések</h1>
        <Orders orders={data.orders} />
      </>
    );
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  if (orders.isLoading) return <Loading />;

  return (
    <section className="wrapper gap-2 [&>button]:text-base [&>button]:text-nowrap [&_h1]:text-xl [&_h1]:font-extrabold [&_h1]:!py-2">
      <div className="logOut translate-x-[-135%] md:translate-x-[-175%] lg:translate-x-[-250%]">
        <ActionBtn content="Kijelentkezem" onClick={handleLogOut} />
      </div>
      <Logo navigate={false} />
      <Title content={`Üdvözlünk ${user?.nick}!`} />
      <ActionBtn content="Új termés hozzáadása" onClick={handleAddCrops} />
      <ActionBtn content="Kiszállítás" onClick={handleSetDelivery} />
      <ActionBtn content="Rendelhető mennyiségek" onClick={handleSetAmounts} />
      {<>renderCrops(); renderOrders();</>}
    </section>
  );
};

export default AdminDash;
