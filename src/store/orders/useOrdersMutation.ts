import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { listOrdersByUser, updateOrderState } from "./orders.api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { OrdersSuccessResponse } from "./types";

export const useOrders = () => {
  const setToken = useAuthStore((s) => s.setToken);

  const query = useQuery<OrdersSuccessResponse, Error>({
    queryKey: ["orders"],
    queryFn: listOrdersByUser,
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

export const useUpdateOrderState = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateOrderState(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // invalidateQueries gondoskodik róla, hogy a useOrders újra lefusson és friss állapot jöjjön.
    },
  });
};
