import AsyncStorage from '@react-native-async-storage/async-storage';

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
