import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from './AxiosServices';
import { CacheIndex } from './CacheIndex';

// Define types for your function parameters and return values
type AsyncStorageKey = string;

interface AsyncStorageUtil {
  saveData: (key: AsyncStorageKey, value: any) => Promise<boolean>;
  getData: (key: AsyncStorageKey) => Promise<any | null>;
  removeData: (key: AsyncStorageKey) => Promise<boolean>;
  clearAllData: () => Promise<boolean>;
}

const AsyncStorageUtil: AsyncStorageUtil = {
  // Function to save data in AsyncStorage
  saveData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error:any) {
      console.error('AsyncStorage error: ', error.message);
      return false;
    }
  },

  // Function to retrieve data from AsyncStorage
  getData: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
      return null;
    } catch (error:any) {
      console.error('AsyncStorage error: ', error.message);
      return null;
    }
  },

  // Function to remove data from AsyncStorage
  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error:any) {
      console.error('AsyncStorage error: ', error.message);
      return false;
    }
  },

  // Function to clear all data from AsyncStorage
  clearAllData: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error:any) {
      console.error('AsyncStorage error: ', error.message);
      return false;
    }
  },

  
};

export default AsyncStorageUtil;

export const getRoleModules = async (roleType: any) => {
  const token = await AsyncStorageUtil.getData("token");
  if (!token) {
    return false;
  }
  try {
    const response = await axiosClient.request({
      url: `/role/modules`,
      method: "get",
      params: { roleType }
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}

export const getUserSession = async () => {
  const token = await AsyncStorageUtil.getData("token");
  if (!token) {
    return false;
  }
  const roleId =await AsyncStorageUtil.getData('userRoleId');
  try {
    const response = await axiosClient.request({
      url: `/users/session`,
      method: "get",
      ... ((roleId !== null) ? { params: { roleId: roleId } } : {})
    });
    return response?.data?.data?.users;
  } catch (error) {
    throw error;
  }
}
