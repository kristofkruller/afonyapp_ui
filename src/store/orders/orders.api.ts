import axios from "axios";
import type {
  OrdersSuccessResponse,
  OrderUpdateResponse,
  RegisterOrderOptionsSuccess,
} from "./types";
import { useAuthStore } from "@/store/auth/useAuthStore";

const BASE_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/api/orders`;

/**
 * Fetches a list of orders for the currently authenticated user.
 *
 * @returns {Promise<OrdersSuccessResponse>} A promise that resolves with the user's orders and a new token.
 * @throws {Error} If no orders are found or the API returns an empty response.
 */
export const listOrdersByUser = async (): Promise<OrdersSuccessResponse> => {
  const token = useAuthStore.getState().token;

  const res = await axios.post(
    `${BASE_URL}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.data || res.data.orders.length < 1)
    throw new Error("Nincs rendelésed");
  return res.data;
};

/**
 * Updates the status of a specific order.
 *
 * @param {number} id - The ID of the order to update.
 * @param {string} status - The new status for the order.
 * @returns {Promise<OrderUpdateResponse>} A promise that resolves with a success message.
 * @throws {Error} If the API returns an empty or invalid response.
 */
export const updateOrderState = async (
  id: number,
  status: string
): Promise<OrderUpdateResponse> => {
  const token = useAuthStore.getState().token;

  const res = await axios.put(
    `${BASE_URL}/status`,
    {
      id: id,
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.data || !res.data.message) throw new Error("Nem érkezett adat!");
  return res.data?.message;
};

/**
 * Fetches options required for registering a new order, such as available amounts and delivery locations.
 *
 * @returns {Promise<RegisterOrderOptionsSuccess>} A promise that resolves with the order registration options.
 * @throws {Error} If no data is received or the options arrays are empty.
 */
export const registerOrderOptions =
  async (): Promise<RegisterOrderOptionsSuccess> => {
    const token = useAuthStore.getState().token;

    const res = await axios.get(`${BASE_URL}/registerOrderOptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (
      !res.data ||
      res.data.amount_options.length < 1 ||
      res.data.delivery_options.length < 1
    ) throw new Error("Nem érkezett adat!");

    return res.data;
  };
