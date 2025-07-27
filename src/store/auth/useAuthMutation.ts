import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "@/store/auth/auth.api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { AxiosError } from "axios";
import type { AuthErrorResponse, LoginSuccessResponse, RegSuccessResponse } from "./types";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setToken = useAuthStore.getState().setToken;

  return useMutation<LoginSuccessResponse, AxiosError<AuthErrorResponse>, { email: string; password: string; }>({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries(); // invalidate user-related data if any
    },
  });
};

export const useRegister = () => {
  const setToken = useAuthStore.getState().setToken;

  return useMutation<RegSuccessResponse, AxiosError<AuthErrorResponse>, { email: string; password: string; }>({
    mutationFn: register,
    onSuccess: (data) => {
      setToken(data.status);
    },
  });
};
