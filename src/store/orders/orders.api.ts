import axios from "axios";
import type { OrdersSuccessResponse } from "./types";
import { useAuthStore } from "../auth/useAuthStore";

const BASE_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/api`;

export const listOrdersByUser = async (): Promise<OrdersSuccessResponse> => {
  const token = useAuthStore.getState().token;

  const res = await axios.post(`${BASE_URL}/orders`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.data || res.data.orders.length < 1) throw new Error("Nincs rendelésed")
  return res.data;
};

export const updateOrderState = async(id: number, status: string): Promise<OrdersSuccessResponse> => {
  const token = useAuthStore.getState().token;

  const res = await axios.put(`${BASE_URL}/orders/status`, {
    id: id,
    status: status
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.data || res.data.orders.length < 1) throw new Error("Nincs rendelésed")
  return res.data;
}