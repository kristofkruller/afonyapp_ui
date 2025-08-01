import axios from "axios";
import type { LoginSuccessResponse, RegSuccessResponse } from "./types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

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
}): Promise<RegSuccessResponse> => {
  const res = await axios.post(`${BASE_URL}/register`, payload);
  return res.data;
};
