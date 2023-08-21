import authedApiRequest from './authedApiRequest';
import { AddWalletRequest } from 'app/pages/SettingPage/slice/types';

const addWalletApi = {
  addWallet(body: AddWalletRequest) {
    const url = 'user/add-wallet';
    return authedApiRequest.post(url, body);
  },
};

export default addWalletApi;
