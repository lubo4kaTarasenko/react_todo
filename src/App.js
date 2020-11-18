import TodoList from './app/components/TodoList';
import SignUp from './app/components/forms/SignUp';
import LogIn from './app/components/forms/LogIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var React = require('react');
var ReactDOM = require('react-dom');

export default class App extends React.Component {
  render() {
    return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sign_up">Sign up</Link>
            </li>
            <li>
              <Link to="/log_in">Log in</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/log_in">
            <LogIn />
          </Route>
          <Route path="/">
            <TodoList />
          </Route>
        </Switch>
      </div>
    </Router>
    )}
}
