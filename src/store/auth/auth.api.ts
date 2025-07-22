import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const register = async (data: {
  email: string;
  pw: string;
  // cpw: string; // a backendnek nem kell confirm pw. 
}) => {
  const res = await axios.post(`${BASE_URL}/register.php`, data);
  return res.data;
};

export const login = async (data: { email: string; pw: string }) => {
  const res = await axios.post(`${BASE_URL}/login.php`, data);
  return res.data;
};
