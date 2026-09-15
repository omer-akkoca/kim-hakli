import { createContext } from 'react';
import { AppColors, ThemeMode } from '@/src/types';

type ThemeContextType = {
  theme: ThemeMode;
  colors: AppColors;
  loading: boolean;
  changeTheme: (theme: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
