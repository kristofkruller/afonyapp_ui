import axios from "axios";
import type { LoginSuccessResponse } from "./types";

const BASE_URL = `${import.meta.env.VITE_PUBLIC_API_URL}/api/auth`;

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<LoginSuccessResponse> => {
  const res = await axios.post(`${BASE_URL}/login`, payload);
  return res.data;
};
export const register = async (payload: {
  email: string;
  password: string;
  // cpassword: string; // a backendnek nem kell confirm password.
}): Promise<void> => {
  await axios.post(`${BASE_URL}/register`, payload, {
    withCredentials: true,
  });
};
