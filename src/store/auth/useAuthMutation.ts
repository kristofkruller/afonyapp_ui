import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, updateUserNick } from "@/store/auth/auth.api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { AxiosError } from "axios";
import type { AuthErrorResponse, AuthSuccessResponse } from "./types";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setToken = useAuthStore.getState().setToken;

  return useMutation<AuthSuccessResponse, AxiosError<AuthErrorResponse>, { email: string; password: string; }>({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries(); // invalidate user-related data if any
      navigate('/dashboard')
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<void, AxiosError<AuthErrorResponse>, { email: string; password: string; }>({
    mutationFn: register,
    onSuccess: () => {
      navigate('/registered');
    },
  });
};

export const useUpdateUserNick = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setToken = useAuthStore.getState().setToken;

  return useMutation<AuthSuccessResponse, AxiosError<AuthErrorResponse>, { nickname: string; }>({
    mutationFn: updateUserNick,
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.invalidateQueries(); // invalidate user-related data if any
      navigate('/dashboard')
    },
  });
};
