var React = require('react');
var ReactDOM = require('react-dom');

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  add() {
    console.log('add')
  }

  render() {
    return (
      <div>
        <div>
          <label for='new'>Enter what to do</label>
          <input type='text' className='task' id='todo'/>
          <button id='add' onClick={ ()=>{ this.add() } }> ADD </button>
        </div>
        <div id='list'>
          <h1>Your todos</h1>
          { JSON.stringify(this.state.items) }
        </div>
      </div>
    );
  }
}
