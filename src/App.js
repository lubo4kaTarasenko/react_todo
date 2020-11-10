import TodoList from './app/TodoList';

var React = require('react');
var ReactDOM = require('react-dom');

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Amazing todos app</h1>
        <TodoList />
      </div>
    );
  }
}
