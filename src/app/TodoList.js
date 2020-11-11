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
    this.update()
  }

  read() {
    let todo = document.getElementById('todo').value   
    return todo
  }

  update() {
    this.state.items.push(this.read())
    this.setState({
      items: this.state.items
    })   
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
          <ul>
          {
            this.state.items.map((e)=>{
              return (
                <li>{e}</li>
              )
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}
