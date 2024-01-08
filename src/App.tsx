import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { light, dark, getCachedTheme } from './Themes';
import { HeadingBar } from './components/HeadingBar';
import { Background } from './components/Background';
import { KaraokeHolder } from './components/KaraokePlayer/KaraokeHolder';

export default function App() {
  const [isLightTheme, setTheme] = useState(getCachedTheme());
  const [appliedTheme, setAppliedTheme] = useState(createTheme(isLightTheme ? light : dark));

  const handleCallback = () => {
    setTheme(!isLightTheme);
    setAppliedTheme(createTheme(!isLightTheme ? light : dark));
    localStorage.setItem('theme', String(!isLightTheme));
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline/>
      <HeadingBar isLightTheme={isLightTheme} parentCallback={handleCallback}/>
      <Background/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KaraokeHolder/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
