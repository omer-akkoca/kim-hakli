import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  set: async (key: string, value: unknown): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove: async (key: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear: async (): Promise<boolean> => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};
