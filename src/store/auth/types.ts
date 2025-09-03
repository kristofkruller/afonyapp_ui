export interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  isTokenValid: () => boolean;
}

export type User = {
  id: string;
  email: string;
  type: "user" | "admin" | "owner";
  nick: string;
  exp: number;
};

export interface AuthSuccessResponse {
  token: string;
}
