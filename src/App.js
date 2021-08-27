import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Default from './components/Default';
import ExamplePage from './components/ExamplePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/:msg">
          <ExamplePage/>
        </Route>
        <Route path="/">
          <Default />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
