import { ThemeOptions } from '@mui/material';
import { blueGrey, indigo, grey } from '@mui/material/colors';

export const light: ThemeOptions = {
  palette: {
    mode: 'light',
    secondary: {
      main: blueGrey[100]
    }
  }
};

export const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: indigo[900],
    },
    background: {
      paper: grey[800]
    },
    secondary: {
      main: blueGrey[300]
    }
  }
};

export const getCachedTheme = () => {
  const cachedTheme = localStorage.getItem('theme');
  let isLightTheme = true;
  isLightTheme = cachedTheme != null ? JSON.parse(cachedTheme) as boolean : isLightTheme;
  return isLightTheme;
};