var React = require('react');
var ReactDOM = require('react-dom');
export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Amazing todos app</h1>
        <div>
          <label for='new'>Enter what to do</label>
          <input type='text' className='task' id='todo'/>
          <button id='add'> ADD </button>
        </div>
        <div id='list'>
          <h1>You`r todos</h1>
        </div>
      </div>
    );
  }
}
