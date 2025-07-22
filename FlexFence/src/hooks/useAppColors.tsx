// src/hooks/useAppColors.ts

import { useTheme } from "../constants/ThemeContext";

export const useAppColors = () => {
  const { theme } = useTheme();

  return theme === 'dark'
    ? {
        background: '#000000',
        text: '#ffffff',
        primary: '#7b61ff',
      }
    : {
        background: '#ffffff',
        text: '#000000',
        primary: '#7b61ff',
      };
};
