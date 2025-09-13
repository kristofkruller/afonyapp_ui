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
  token: string;
}

export interface OrderUpdateResponse {
  message: string;
}

export interface RegisterOrderOptionsSuccess {
  amount_options: Amount[];
  delivery_options: Delivery[];
}
export interface OrderStore extends RegisterOrderOptionsSuccess {
  delivery_methods: DeliveryMethod[];
  amountId: string;
  selectAmount: (amountId: string) => void;
  setAmounts: (amounts: Amount[]) => void;
  cityId: string;
  selectCity: (cityId: string) => void;
  setDeliveries: (deliveries: Delivery[]) => void;
  methodId: string;
  setDeliveryMethod: (methodId: string) => void;
  setMethods: (methods: DeliveryMethod[]) => void;
  reset: () => void;
}