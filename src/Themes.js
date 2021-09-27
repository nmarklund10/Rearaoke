import { blueGrey } from "@material-ui/core/colors";

export const light = {
  palette: {
    type: 'light',
    secondary: {
      main: blueGrey[100]
    }
  }
};

export const dark = {
  palette: {
    type: 'dark',
    secondary: {
      main: blueGrey[300]
    }
  }
};

export function getCachedTheme() {
  let lightTheme = true;
  let cachedTheme = localStorage.getItem('theme');
  cachedTheme = cachedTheme != null ? JSON.parse(cachedTheme) : lightTheme;
  return cachedTheme;
}