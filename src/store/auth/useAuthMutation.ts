import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register } from '@/store/auth/auth.api';
import { useAuthStore } from '@/store/auth/useAuthStore';

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if ('token' in data) {
        useAuthStore.getState().setToken(data.token);
      }
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if ('token' in data) {
        useAuthStore.getState().setToken(data.token);
        queryClient.invalidateQueries(); // invalidate user-related data if any
      }
    },
  });
};