import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;

const baseApiRequest: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

baseApiRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error && error.response && error.response.status === 401) {
      // remove token
      // console.log(error.response.data.messages[0].message);
      // toast.error(error.response.data.messages[0].message);
      //   store.dispatch({ type: "walletAddress/logoutSuccess" })
    }
    throw error;
  }
);

export default baseApiRequest;
