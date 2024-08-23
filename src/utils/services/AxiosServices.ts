import axios from "axios";
import { config } from "../config";
import AsyncStorageUtil from "./LocalCache";

const axiosClient = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "x-tenant-id": config.DEFAULT_TENANT,
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorageUtil.getData("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    let tenantId = await AsyncStorageUtil.getData("tenant_id");
    if (tenantId) {
     // console.log(tenantId, 'id from service');
      config.headers['x-tenant-id'] = tenantId;
    }
    let roleId = await AsyncStorageUtil.getData('userRoleId');
    if (roleId) {
      config.headers['x-Role-id'] = roleId;
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
