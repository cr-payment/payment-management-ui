/* --- STATE --- */
export interface AuthState {
  loading: boolean;
  dataAuth?: DataAuth;
  error: boolean;
}

export interface DataAuth {
  avatarUrl?: string;
  brandId?: string;
  countryId?: string;
  createdAt?: string;
  data?: string;
  dateOfBirth?: string;
  email?: string;
  emailCode?: string;
  firstName?: string;
  group?: string;
  isActive2fa?: number;
  isActiveEmailCode?: number;
  isActiveKyc?: number;
  isVendor?: string;
  lastName?: string;
  phone?: string;
  status?: string;
  token?: string;
  type?: string;
  username?: string;
  vendorName?: string;
  wallet?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
  // twofa: string;
  // emailCode: string;
}
