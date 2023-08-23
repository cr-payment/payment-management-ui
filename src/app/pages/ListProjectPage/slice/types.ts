import { Project } from 'app/pages/ProjectPage/slice/types';

/* --- STATE --- */
export interface ProjectsState {
  loading: boolean;
  dataProjects: Project[];
  error: boolean;
}
