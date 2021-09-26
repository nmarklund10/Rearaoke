export const light = {
  palette: { type: "light" }
};

export const dark = {
  palette: { type: "dark" }
};

export function getCachedTheme() {
  let lightTheme = true;
  let cachedTheme = localStorage.getItem('theme');
  cachedTheme = cachedTheme != null ? JSON.parse(cachedTheme) : lightTheme;
  return cachedTheme;
}