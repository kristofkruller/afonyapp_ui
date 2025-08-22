import type { Order } from "@/store/orders/types";
import { formattedDate } from "@/helpers";
import { ActionBtn } from "../assets/Button";

type OrdersProps = {
  orders: Order[];
};
export const Orders = ({ orders }: OrdersProps) => {
  return (
    <section className="flexCenterCol gap-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className={`contentBox [&>*]:!px-2
          ${
            order.status !== "Lemondott" && order.status !== "Teljesített"
              ? `bg-[var(--lavender)]`
              : order.status === "Teljesített"
              ? `bg-teal-50`
              : `bg-[var(--white)]`
          }`}
        >
          {/* LEFT */}
          <img
            src={
              order.status === "Teljesített"
                ? "succAf.png"
                : order.status === "Lemondott"
                ? "cancelledAf.png"
                : "happyAf.png"
            }
            alt="Status Icon"
            className="max-w-30 transition-all"
          />
          {/* CENTER */}
          <div className="gap-1 lg:[&>*]:text-start [&>*]:text-indigo-900 text-nowrap text-xs lg:text-base !m-4 !mb-2 !mt-2 lg:!m-0 lg:!mt-0">
            <h2 className="font-bold">{`#${order.id}`}</h2>
            <p>{`${order.amount} kg Áfonya`}</p>
            <p>{order.deliverytype}</p>
            <p>{`Rendelés leadva: ${formattedDate(order.cdate)}`}</p>
            <p>
              Rendelés státusza:{" "}
              <span className="font-bold">{order.status}</span>
            </p>
            <h1 className="font-bold text-base lg:text-xl">{`${order.cost} Ft`}</h1>
          </div>
          {/* RIGHT */}
          <div className="flexCenterCol gap-2">
            {order.status === "Értesített" && (
              <ActionBtn content="Megerősítem" />
            )}
            {order.status !== "Lemondott" && order.status !== "Teljesített" ? (
              <ActionBtn content="Lemondom" />
            ) : (
              <div className="!px-6 !py-1 relative block min-w-35 lg:min-w-40"></div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
