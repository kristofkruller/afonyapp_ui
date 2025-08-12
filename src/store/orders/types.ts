export interface Order {
  id: number;
  amount: number;
  deliverytype: string;
  cdate: string; // ISO dátum formátum pl. "2025-08-10T14:23:00.000Z"
  status: string;
  cost: number;
  telephone: string;
}

export interface OrdersSuccessResponse {
  orders: Order[];
}

export interface OrdersState {
  orders: Order[] | null;
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
}