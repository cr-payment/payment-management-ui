import { AuthRequest } from 'app/pages/LoginPage/slice/types';
import baseApiRequest from './baseApiRequest';

const authApi = {
  login(body: AuthRequest) {
    const url = 'user/login';
    return baseApiRequest.post(url, body);
  },

  logout() {
    const url = 'user/logout';
    return baseApiRequest.post(url);
  },

  updatePassword(body: AuthRequest) {
    const url = 'user/update-password';
    return baseApiRequest.post(url, body);
  },
};

export default authApi;
