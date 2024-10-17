import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

const axiosRequest = async (options: AxiosRequestConfig): Promise<any> => {
  const onSuccess = (res: AxiosResponse): any => {
    return res.data;
  };

  const onError = (err: any): never => {
    throw err.response?.data;
  };

  return axios(options).then(onSuccess).catch(onError);
};

export default axiosRequest;
