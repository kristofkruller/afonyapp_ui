import type { Order } from "@/store/orders/types";
import { formattedDate } from "@/helpers";

type OrdersProps = {
  orders: Order[];
};
export const Orders = ({ orders }: OrdersProps) => {
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