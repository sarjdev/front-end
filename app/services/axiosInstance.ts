import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://sarj.dev/v1',
  withCredentials: true
});

export default axiosInstance;
