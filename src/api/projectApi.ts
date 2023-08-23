import { CreateProjectRequest } from 'app/pages/ProjectPage/slice/types';
import baseApiRequest from './baseApiRequest';

const projectApi = {
  getAll() {
    const url = 'project/all-project';
    return baseApiRequest.get(url);
  },
  create(body: CreateProjectRequest) {
    const url = 'project/create-project';
    return baseApiRequest.post(url, body);
  },
  detail(id: string | number) {
    const url = `project/project-detail/${id}`;
    return baseApiRequest.get(url);
  },
};

export default projectApi;
