import axios from "axios";
import type { CropsSuccessResponse } from "./types";
import { useAuthStore } from "../auth/useAuthStore";

const BASE_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/api/crops`;

export const fetchAllCrops = async (): Promise<CropsSuccessResponse> => {
  const token = useAuthStore.getState().token;
  const res = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.data || res.data.crops.length < 1)
    throw new Error("Nincs rendelésed");
  return res.data;
};
