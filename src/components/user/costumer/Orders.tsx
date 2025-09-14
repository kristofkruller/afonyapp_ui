import type { Order } from "@/store/orders/types";
import { formattedDate } from "@/helpers";
import { ActionBtn } from "@/components/assets/Button";
import { useUpdateOrderState } from "@/store/orders/useOrdersMutation";
import { useUiStore } from "@/store/ui/useUiStore";
import PopUp, { type PopUpProps } from "@/components/assets/PopUp";
import { useState } from "react";

type OrdersProps = {
  orders: Order[];
};

/**
 * Orders component displays a list of user's orders with their status and actions.
 * Possible to change status by the user they can cancel or confirm if az order is ready to be shipped.
 * @param {OrdersProps} { orders } - The list of orders to display.
 */
export const Orders = ({ orders }: OrdersProps) => {
  const updateOrder = useUpdateOrderState();

  // POPUP
  const [popUpState, setPopUpState] = useState<PopUpProps>({
    title: "",
    content: "",
    btnContent: [],
    sign: "",
  });
  const { togglePopUp } = useUiStore();

  /**
   * Displays a confirmation pop-up for canceling an order.
   * @param {Order} order - The order to be canceled.
   */
  const lemondomPopUp = (order: Order) => {
    const handleCancel = () => {
      if (!order.id) return;
      updateOrder.mutate({
        id: order.id,
        status: "Lemondott",
      });
      togglePopUp();
    };
    const handleBack = () => {
      setPopUpState({ title: "", content: "", btnContent: [], sign: "" });
      togglePopUp();
    };
    togglePopUp();
    setPopUpState({
      title: "Rendelés lemondása",
      content: `Kérjük, erősítsd meg, hogy valóban szeretnéd lemondani a rendelésed. 
        A lemondás visszavonhatatlan, és ha meggondolnád magad új rendelés leadását követően csak a sor végére tudjuk a rendelésed felvenni.`,
      btnContent: [
        {
          content: "LEMONDOM A RENDELÉST",
          onClick: handleCancel,
        },
        {
          content: "Vissza",
          onClick: handleBack,
        },
      ],
      sign: "cancelledAf",
    });
  };

  /**
   * Displays a confirmation pop-up for confirming an order.
   * @param {Order} order - The order to be confirmed.
   */
  const megerositemPopUp = (order: Order) => {
    const handleConfirm = () => {
      if (!order.id) return;
      updateOrder.mutate({
        id: order.id,
        status: "Megerősített",
      });
      togglePopUp();
    };
    const handleBack = () => {
      setPopUpState({ title: "", content: "", btnContent: [], sign: "" });
      togglePopUp();
    };

    togglePopUp();
    setPopUpState({
      title: "Rendelés megerősítése",
      content: `Kérjük, erősítsd meg, hogy továbbra is igényt tartasz a rendelésedre. 
        Ezt követően 24 órán belül felvesszük veled a kapcsolatot a kiszállítás vagy személyes átvétel részleteivel.`,
      btnContent: [
        {
          content: "MEGERŐSÍTEM A RENDELÉST",
          onClick: handleConfirm,
        },
        {
          content: "Vissza",
          onClick: handleBack,
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
    <section className="flexCenterCol gap-4 [&>div]:last-of-type:!mb-4">
      <PopUp
        content={popUpState.content}
        title={popUpState.title}
        btnContent={popUpState.btnContent}
        sign={popUpState.sign}
      />
      {orders.map((order) => (
        <div
          key={order.id}
          className={`border-2 border-solid border-indigo-800 rounded-xl [&>*]:!px-2
            max-w-100 md:max-w-fit w-full
          ${
            order.status === "Beérkezett"
              ? `bg-[var(--lavender)]`
              : order.status === "Teljesített"
              ? `bg-teal-50`
              : order.status === "Megerősített"
              ? `bg-indigo-200`
              : `bg-[var(--white)]`
          }`}
        >
          <div className="contentBox md:min-w-xl">
            {/* LEFT */}
            <img
              src={
                order.status === "Teljesített"
                  ? "laughingAf.png"
                  : order.status === "Megerősített"
                  ? "afi_icon_smiley.png"
                  : order.status === "Lemondott"
                  ? "cancelledAf.png"
                  : "happyAf.png"
              }
              alt="Status Icon"
              className={`max-w-30 transition-all ${
                order.status === "Megerősített" && "scale-[120%]"
              }`}
            />
            {/* CENTER */}
            <div className="gap-1 md:[&>*]:text-start [&>*]:text-indigo-800 text-nowrap text-xs md:text-base md:!m-0 min-w-max">
              <h2 className="font-bold">{`#${order.id}`}</h2>
              <p>{`${order.amount} kg Áfonya`}</p>
              <p>{order.deliverytype}</p>
              <p>{`Rendelés leadva: ${order.cdate ? formattedDate(order.cdate) : new Date(Date.now()).toISOString()}`}</p>
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
