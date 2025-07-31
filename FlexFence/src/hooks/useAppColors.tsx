// src/hooks/useAppColors.ts

import { useTheme } from "../constants/ThemeContext";

export const useAppColors = () => {
  const { theme } = useTheme();

  return theme === 'dark'
    ? {
        background: '#131313',
        text: '#ffffff',
        primary: '#fff',
        reggy:'#fff',
        card:'#131313'
      }
    : {
        background: '#fafafa',
        text: '#000000',
        primary: '#1F229A',
        reggy:'#666666',
        card:'#fff'

      };
};
