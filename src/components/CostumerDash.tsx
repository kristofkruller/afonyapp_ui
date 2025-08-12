// import React from 'react'

import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "./assets/Logo";
import { Title } from "./assets/TextStlye";
import { useOrdersStore } from "@/store/orders/useOrdersStore";
import Loading from "./assets/Loading";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { Order } from "@/store/orders/types";
import { formattedDate } from "@/helpers";

type OrdersProps = {
  orders: Order[];
};
const Orders = ({ orders }: OrdersProps) => {
  return (
    <section className="flexCenterCol gap-4">
    {orders.map((order) => (
      <div key={order.id} className="contentBox">
        <img
          src={
            order.status === "Teljesített" ? "succAf.png" :
            order.status === "Lemondott" ? "cancelledAf.png" :
            "happyAf.png"
          }
          alt="Status Icon"
          className="max-w-30 transition-all !p-2"
        />
        <div className="gap-1 [&*]:flex text-nowrap">
          <h2 className="font-bold">{`#${order.id}`}</h2>
          <p>{`${order.amount} kg Áfonya`}</p>
          <p>{order.deliverytype}</p>
          <p>{`Rendelés leadva: ${formattedDate(order.cdate)}`}</p>
          <p>Rendelés státusza: <span className="font-bold">{order.status}</span></p>
          <h1 className="font-bold text-xl">{`${order.cost} Ft`}</h1>
        </div>
        <div>
          
        </div>
      </div>
    ))}
    </section>
  );
};

const CostumerDash = () => {
  const navigate = useNavigate();
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
