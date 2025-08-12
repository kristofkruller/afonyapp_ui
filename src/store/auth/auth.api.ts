import axios from "axios";
import type { AuthSuccessResponse } from "./types";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/api/auth`;

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<AuthSuccessResponse> => {
  const res = await axios.post(`${BASE_URL}/login`, payload);
  return res.data;
};

export const register = async (payload: {
  email: string;
  password: string;
  // cpassword: string; // a backendnek nem kell confirm password.
}): Promise<void> => { // void - 2xx status -> onSuccess
  await axios.post(`${BASE_URL}/register`, payload, {
    withCredentials: true,
  });
};

export const updateUserNick = async (payload: {
  nick: string;
}): Promise<AuthSuccessResponse> => {
  const token = useAuthStore.getState().token;

  const res = await axios.put(`${BASE_URL}/me`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};