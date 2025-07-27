import axios from "axios";
import type { AuthSuccessResponse } from "./types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<AuthSuccessResponse> => {
  const res = await axios.post(`${BASE_URL}/login.php`, payload);
  return res.data;
};
export const register = async (payload: {
  email: string;
  password: string;
  // cpassword: string; // a backendnek nem kell confirm password.
}): Promise<AuthSuccessResponse> => {
  const res = await axios.post(`${BASE_URL}/register`, payload);
  return res.data;
};
