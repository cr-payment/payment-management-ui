
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;

const authedApiRequest: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

authedApiRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    const user = localStorage.getItem('cr-payment_user') || '{}';
    const access_token = JSON.parse(user)?.token;
    newConfig.headers['Authorization'] = 'Bearer ' + access_token;
    return newConfig;
  }
);

authedApiRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error && error.response && error.response.status === 401) {
    }
    throw error;
  }
);

export default authedApiRequest;