
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from 'axios';

export const baseURL = process.env.REACT_APP_API_URL;

const getRequest: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
  },
});

getRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error && error.response && error.response.status === 401) {
    }
    throw error;
  }
);

export default getRequest;