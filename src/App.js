import { useState, useEffect } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { light, dark, getCachedTheme } from './Themes';
import Holder from './components/KaraokePlayer/Holder';
import HeadingBar from './components/HeadingBar';
import Background from './components/Background';
import createBackground from './js/webgl';

export default function App() {
  const [isLightTheme, setTheme] = useState(getCachedTheme());
  const appliedTheme = createTheme(isLightTheme ? light : dark);

  const handleCallback = () => {
    setTheme(!isLightTheme);
    localStorage.setItem('theme', !isLightTheme);
  }

  useEffect(() => {
    createBackground();
  }, []);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <HeadingBar isLightTheme={isLightTheme} parentCallback={handleCallback}/>
      <Background/>
      <Router>
        <Switch>
          <Route exact={true} path="/">
            <Holder/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
