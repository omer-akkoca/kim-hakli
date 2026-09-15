import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { ThemeMode } from '@/src/types';
import { storage } from '@/src/utils';
import { darkColors, lightColors, STORAGE_KEYS } from '@/src/constants';
import { ThemeContext } from '@/src/contexts';

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { colorScheme } = useColorScheme();

  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(colorScheme === 'dark' ? 'dark' : 'light');

  const colors = useMemo(() => (theme === 'dark' ? darkColors : lightColors), [theme]);

  useEffect(() => {
    const initializeTheme = async () => {
      setLoading(true);
      try {
        const savedTheme = await storage.get<ThemeMode>(STORAGE_KEYS.THEME);

        const initialTheme: ThemeMode =
          savedTheme === 'dark' || savedTheme === 'light'
            ? savedTheme
            : colorScheme === 'dark'
              ? 'dark'
              : 'light';

        setTheme(initialTheme);

        if (!savedTheme) {
          await storage.set(STORAGE_KEYS.THEME, initialTheme);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeTheme();
  }, []);

  const changeTheme = async (newTheme: ThemeMode) => {
    setTheme(newTheme);
    await storage.set(STORAGE_KEYS.THEME, newTheme);
  };

  const toggleTheme = async () => {
    await changeTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        loading,
        changeTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };
