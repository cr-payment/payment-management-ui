import { AuthRequest } from 'app/pages/LoginPage/slice/types';
import baseApiRequest from './baseApiRequest';

const exampleApi = {
  login(body: AuthRequest) {
    const url = 'user/login';
    return baseApiRequest.post(url, body);
  },
};

export default exampleApi;
