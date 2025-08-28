import type { Order } from "@/store/orders/types";
import { formattedDate } from "@/helpers";
import { ActionBtn } from "../assets/Button";
import { useUpdateOrderState } from "@/store/orders/useOrdersMutation";
import { useUiStore } from "@/store/ui/useUiStore";
import PopUp, { type PopUpProps } from "../assets/PopUp";
import { useId, useState } from "react";

type OrdersProps = {
  orders: Order[];
};
export const Orders = ({ orders }: OrdersProps) => {
  const id = useId();
  const updateOrder = useUpdateOrderState();

  // POPUP
  const [popUpState, setPopUpState] = useState<PopUpProps>({
    title: "",
    content: "",
    btnContent: [],
    sign: "",
  });
  const { togglePopUp } = useUiStore();
  const lemondomPopUp = (order: Order) => {
    togglePopUp();
    setPopUpState({
      title: "Rendelés lemondása",
      content: `Kérjük, erősítsd meg, hogy valóban szeretnéd lemondani a rendelésed. 
        A lemondás visszavonhatatlan, és ha meggondolnád magad új rendelés leadását követően csak a sor végére tudjuk a rendelésed felvenni.`,
      btnContent: [
        {
          content: "LEMONDOM A RENDELÉST",
          onClick: () => {
            updateOrder.mutate({
              id: order.id,
              status: "Lemondott",
            });
            togglePopUp();
          },
        },
        {
          content: "Vissza",
          onClick: () => {
            setPopUpState({ title: "", content: "", btnContent: [], sign: "" });
            togglePopUp();
          },
        },
      ],
      sign: "cancelledAf",
    });
  };
  const megerositemPopUp = (order: Order) => {
    togglePopUp();
    setPopUpState({
      title: "Rendelés megerősítése",
      content: `Kérjük, erősítsd meg, hogy továbbra is igényt tartasz a rendelésedre. 
        Ezt követően 24 órán belül felvesszük veled a kapcsolatot a kiszállítás vagy személyes átvétel részleteivel.`,
      btnContent: [
        {
          content: "MEGERŐSÍTEM A RENDELÉST",
          onClick: () => {
            updateOrder.mutate({
              id: order.id,
              status: "Megerősített",
            });
            togglePopUp();
          },
        },
        {
          content: "Vissza",
          onClick: () => {
            setPopUpState({ title: "", content: "", btnContent: [], sign: "" });
            togglePopUp();
          },
        },
      ],
      sign: "succAf",
    });
  };

  // INFO
  const beErkezettInfo = `Amint rendelkezésünkre áll a megfelelő mennyiségű friss termés, keresni fogunk.`;
  const ertesitettInfo = `A rendelt mennyiség elérhető, kérlek jelezz vissza, hogy igényt tartasz az áfonyára. 
    Kérdés esetén vedd fel velünk a kapcsolatot telefonon 06301234567`;
  const megErositettInfo = `Köszönjük, hogy megerősítetted a rendelésed. 
    Hamarosan keresni fogunk a kiszállítás várható idejével kapcsolatban.`;

  return (
    <section className="flexCenterCol gap-4">
      <PopUp
        content={popUpState.content}
        title={popUpState.title}
        btnContent={popUpState.btnContent}
        sign={popUpState.sign}
      />
      {orders.map((order, i) => (
        <div
          key={id + i}
          className={`border-2 border-solid border-indigo-800 rounded-xl [&>*]:!px-2
            max-w-100 md:max-w-fit
          ${
            order.status !== "Lemondott" && order.status !== "Teljesített"
              ? `bg-[var(--lavender)]`
              : order.status === "Teljesített"
              ? `bg-teal-50`
              : `bg-[var(--white)]`
          }`}
        >
          <div className="contentBox md:min-w-xl">
            {/* LEFT */}
            <img
              src={
                order.status === "Teljesített"
                  ? "laughingAf.png"
                  : order.status === "Lemondott"
                  ? "cancelledAf.png"
                  : "happyAf.png"
              }
              alt="Status Icon"
              className="max-w-30 transition-all"
            />
            {/* CENTER */}
            <div className="gap-1 md:[&>*]:text-start [&>*]:text-indigo-800 text-nowrap text-xs md:text-base md:!m-0 min-w-max">
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
                <ActionBtn
                  content="Megerősítem"
                  onClick={() => megerositemPopUp(order)}
                />
              )}
              {order.status !== "Lemondott" &&
              order.status !== "Teljesített" ? (
                <ActionBtn
                  content="Lemondom"
                  onClick={() => lemondomPopUp(order)}
                />
              ) : (
                <div className="!px-6 !py-1 relative block min-w-35 lg:min-w-40"></div>
              )}
            </div>
          </div>
          {order.status === "Beérkezett" ? (
            <p className="font-hun text-xs text-start italic opacity-70 !pb-2">
              {beErkezettInfo}
            </p>
          ) : order.status === "Értesített" ? (
            <p className="font-hun text-xs text-start italic opacity-70 !pb-2">
              {ertesitettInfo}
            </p>
          ) : order.status === "Megerősített" ? (
            <p className="font-hun text-xs text-start italic opacity-70 !pb-2">
              {megErositettInfo}
            </p>
          ) : (
            <></>
          )}
        </div>
      ))}
    </section>
  );
};
