import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Detail, View } from './screens'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/view" component={View} />
      </Switch>
    </Router>
  );
}

export default App;
