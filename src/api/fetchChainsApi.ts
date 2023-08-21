import getRequest from './getRequest';

const fetchChainApi = {
  fetchChains() {
    const url = 'currency-config/list';
    // console.log('fetching Chains from api');
    return getRequest.get(url);
  },
};

export default fetchChainApi;