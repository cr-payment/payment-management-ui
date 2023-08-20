/* --- STATE --- */
export interface AddEditProjectState {
  loading: boolean;
  dataProject: any;
  error: boolean;
}

export interface CreateProjectRequest {
  projectName: string;
  currency: string;
}
