import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { listOrdersByUser, updateOrderState } from "./orders.api";


export const useOrders = () => useQuery({
  queryKey: ["orders"],
  queryFn: listOrdersByUser,
});

export const useUpdateOrderState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateOrderState(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};