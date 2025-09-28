import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../auth/useAuthStore";
import type { CropsSuccessResponse } from "./types";
import { fetchAllCrops } from "./crops.api";
import { useEffect } from "react";

export const useCrops = () => {
  const setToken = useAuthStore((s) => s.setToken);

  const query = useQuery<CropsSuccessResponse, Error>({
    queryKey: ["crops"],
    queryFn: fetchAllCrops,
  });

  // callback külön effect-ben
  useEffect(() => {
    if (query.data?.token) {
      setToken(query.data.token);
    } else {
      // console.log("Token nem frissült!")
    }
  }, [query.data?.token, setToken]);

  return query;
};