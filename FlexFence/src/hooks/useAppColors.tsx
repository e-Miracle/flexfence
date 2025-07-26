// src/hooks/useAppColors.ts

import { useTheme } from "../constants/ThemeContext";

export const useAppColors = () => {
  const { theme } = useTheme();

  return theme === 'dark'
    ? {
        background: '#131313',
        text: '#ffffff',
        primary: '#fff',
        reggy:'#fff'
      }
    : {
        background: '#ffffff',
        text: '#000000',
        primary: '#1F229A',
        reggy:'#666666'

      };
};
