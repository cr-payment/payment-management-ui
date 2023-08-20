/* --- STATE --- */
export interface AuthState {
  loading: boolean;
  dataAuth?: DataAuth;
  error: boolean;
}

export interface DataAuth {
  token?: string;
  user?: any;
}

export interface AuthRequest {
  email: string;
  password: string;
  // twofa: string;
  // emailCode: string;
}
