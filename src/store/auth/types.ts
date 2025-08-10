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
  type: "user" | "admin";
  nick: string;
  exp: number;
};

export interface AuthSuccessResponse {
  token: string;
};

export interface ErrorResponse {
  message: string;
};

export interface Order {
  id: number;
  amount: number;
  deliverytype: string;
  cdate: string; // ISO dátum formátum pl. "2025-08-10T14:23:00.000Z"
  status: string;
  cost: number; 
}

export interface OrdersSuccessResponse {
  orders: Order[];
}