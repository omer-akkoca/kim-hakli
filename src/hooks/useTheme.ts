import { useContext } from 'react';
import { ThemeContext } from '@/src/contexts';

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme, ThemeProvider içinde kullanılmalıdır.');
  }

  return context;
};

export { useTheme };
