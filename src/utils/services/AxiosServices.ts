import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { config } from "../config";

const axiosClient = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "x-tenant-id": 'dell',
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['context'] = 'admin';
    }
    let tenantId = await AsyncStorage.getItem("tenant_id");
    if (tenantId) {
      config.headers['x-tenant-id'] = tenantId;
    }
    return config;
  },
  (error) => {
    // console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.error("Response Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
