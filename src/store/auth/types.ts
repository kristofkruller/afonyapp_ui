export interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => boolean;
  logout: () => void;
}

export type User = {
  id: string;
  email: string;
  type: "user" | "admin";
  exp: number;
};

export interface LoginSuccessResponse {
  token: string;
};
export interface RegSuccessResponse {
  status: string;
};

export interface AuthErrorResponse {
  message: string;
};