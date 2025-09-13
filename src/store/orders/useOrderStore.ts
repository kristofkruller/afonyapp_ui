import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderStore } from "./types";

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      amountId: "",
      amount_options: [],
      cityId: "",
      methodId: "1",
      delivery_options: [],
      delivery_methods: [
        { id: "1", content: "Házhozszállítás" },
        { id: "2", content: "Személyes átvétel" },
      ],
      selectAmount: (amountId) =>
        set((state) => {
          const idx = state.amount_options.findIndex(
            (a) => String(a.id) === amountId
          );
          if (idx === -1) return { amountId };
          const newArr = [...state.amount_options];
          const [selected] = newArr.splice(idx, 1);
          get().setAmounts([selected, ...newArr]);
          // console.log(get().amount_options)
          return {
            amountId,
            amount_options: [selected, ...newArr],
          };
        }),
      setAmounts: (amounts) => set({ amount_options: amounts }),
      selectCity: (cityId) =>
        set((state) => {
          const idx = state.delivery_options.findIndex(
            (d) => String(d.id) === cityId
          );
          if (idx === -1) return { cityId };
          const newArr = [...state.delivery_options];
          const [selected] = newArr.splice(idx, 1);
          get().setDeliveries([selected, ...newArr]);
          return { cityId, delivery_options: [selected, ...newArr] };
        }),
      setDeliveries: (deliveries) => set({ delivery_options: deliveries }),
      setDeliveryMethod: (methodId) =>
        set((state) => {
          const idx = state.delivery_methods.findIndex(
            (m) => m.id === methodId
          );
          if (idx === -1) return { methodId };
          const newArr = [...state.delivery_methods];
          const [selected] = newArr.splice(idx, 1);
          get().setMethods([selected, ...newArr]);
          return { methodId, delivery_methods: [selected, ...newArr] };
        }),
      setMethods: (methods) => set({ delivery_methods: methods }),
      reset: () => {
        set({
          amountId: "",
          amount_options: [],
          cityId: "",
          methodId: "1",
          delivery_options: [],
          delivery_methods: [
            { id: "1", content: "Házhozszállítás" },
            { id: "2", content: "Személyes átvétel" },
          ],
        });
        localStorage.removeItem("order-store");
      },
    }),
    {
      name: "order-store",
    }
  )
);
