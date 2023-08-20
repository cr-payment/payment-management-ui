/* --- STATE --- */
export interface Merch {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export interface BillState {
  loading: boolean;
  billData?: BillData;
  error: boolean;
}

export interface BillData {
  name: string;
  email: string;
  number: string;
  cart: Merch[];
  shipping: number;
  total: number;
  paidIn: number;
  token: string;
  transactionHash: string;
}
