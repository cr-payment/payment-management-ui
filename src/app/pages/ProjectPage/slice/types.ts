/* --- STATE --- */
export interface ProjectState {
  loading: boolean;
  dataProject: Project;
  dataAddProject: Project;
  dataEditProject: Project;
  dataPayments: PaymentInProject[];
  error: boolean;
}

export interface Project {
  id?: string;
  avatarUrl?: string;
  projectName?: string;
  email?: string;
  createdAt?: string;
  noTransaction?: string;
  webHook?: string;
  apiKey?: string;
  totalEarned?: string;
  type?: string;
}

export interface CreateProjectRequest {
  projectName: string;
  email: string;
  walletId: number;
  apiKey: string;
  webHook: string;
}

export interface PaymentInProject {
  id?: string;
  amount?: number;
  avatarUrl?: string;
  contractAddress?: string;
  transactionHash?: string;
  createdAt?: string;
  customerAddress?: string;
  merchantAddress?: string;
  name?: string;
  currency?: string;
  projectName?: string;
  tokenAddress?: string;
}

export type PaymentInProjectAndProject = [...PaymentInProject[], Project];
