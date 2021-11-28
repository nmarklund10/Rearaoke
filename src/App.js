import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { light, dark, getCachedTheme } from './Themes';
import HeadingBar from './components/HeadingBar';
import Background from './components/Background';
import createBackground from './js/webgl';
import KaraokeHolder from './components/KaraokePlayer/KaraokeHolder';

export default function App() {
  const [isLightTheme, setTheme] = useState(getCachedTheme());
  const [appliedTheme, setAppliedTheme] = useState(createTheme(isLightTheme ? light : dark));

  const handleCallback = () => {
    setTheme(!isLightTheme);
    setAppliedTheme(createTheme(!isLightTheme ? light : dark))
    localStorage.setItem('theme', !isLightTheme);
  }

  useEffect(() => {
    createBackground(appliedTheme.palette.secondary.main);
  }, [appliedTheme]);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <HeadingBar isLightTheme={isLightTheme} parentCallback={handleCallback}/>
      <Background/>
      <Router>
        <Switch>
          <Route exact={true} path="/">
            <KaraokeHolder/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
