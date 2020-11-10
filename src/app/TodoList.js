var React = require('react');
var ReactDOM = require('react-dom');

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
        <div>
          <label for='new'>Enter what to do</label>
          <input type='text' className='task' id='todo'/>
          <button id='add'> ADD </button>
        </div>
        <div id='list'>
          <h1>Your todos</h1>
        </div>
      </div>
    );
  }
}
