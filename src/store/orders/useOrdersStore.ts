import { create } from "zustand";
import type { OrdersState } from "./types";
import { listOrdersByUser } from "./orders.api";

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: null,
  loading: false,
  error: null,

  fetchOrders: async() => {
      set({ loading: true, error: null });
      try {
        const data = await listOrdersByUser();
        set({ orders: data.orders, loading: false });
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error.message || "Hiba a rendelés lekérésekor", loading: false });
        } else {
          set({ error: "Ismeretlen hiba történt", loading: false });
        }
      }
  },
}));
