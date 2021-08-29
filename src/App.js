import { useState } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ExamplePage from './components/ExamplePage';
import HeadingBar from './components/HeadingBar';
import CssBaseline from "@material-ui/core/CssBaseline";
import { light, dark } from './Themes';
import { ThemeProvider } from '@material-ui/core';

export default function App() {
  const [isLightTheme, setTheme] = useState(true);
  const appliedTheme = createTheme(isLightTheme ? light : dark);
  const handleCallback = () => {
    setTheme(!isLightTheme);
  }

  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <HeadingBar isLightTheme={isLightTheme} parentCallback={handleCallback}/>
        <Router>
          <Switch>
            <Route path="/:msg">
              <ExamplePage/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}
