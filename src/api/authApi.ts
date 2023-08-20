import { AuthRequest } from 'app/pages/LoginPage/slice/types';
import baseApiRequest from './baseApiRequest';

const authApi = {
  login(body: AuthRequest) {
    const url = 'user/login';
    return baseApiRequest.post(url, body);
  },

  logout() {
    const url = 'logout';
    return baseApiRequest.get(url);
  },
};

export default authApi;
