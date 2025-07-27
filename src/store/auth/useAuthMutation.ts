import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "@/store/auth/auth.api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { AxiosError } from "axios";
import type { AuthErrorResponse, AuthSuccessResponse } from "./types";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setToken = useAuthStore.getState().setToken;

  return useMutation<AuthSuccessResponse, AxiosError<AuthErrorResponse>, { email: string; password: string; }>({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries(); // invalidate user-related data if any
    },
  });
};

export const useRegister = () => {
  const setToken = useAuthStore.getState().setToken;

  return useMutation<AuthSuccessResponse, AxiosError<AuthErrorResponse>, { email: string; password: string; }>({
    mutationFn: register,
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
};
