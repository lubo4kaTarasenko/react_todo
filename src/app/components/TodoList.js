import TodoApi from '../services/TodoApi';

var React = require('react');
var ReactDOM = require('react-dom');

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }
  componentDidMount() {
    this.reloadList()
  }

  reloadList(){
    new TodoApi().read_fetch().then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  readNewItem(){
    let newItem = document.getElementById('todo')
    let newItemText = newItem.value
    let newItemColor = 'red'
    let newItemCheck = false
    let item = {
      text: newItemText,
      color: newItemColor,
      check: newItemCheck
    }
    return item
  }

  create(e){
    new TodoApi().create_fetch(e).then(response => {
      this.reloadList()
      console.log(response)
    })
  }

  update(itemText, itemCheck, itemId){
   new TodoApi().update_fetch(itemText, itemCheck, itemId).then(response => {
      this.reloadList()
      console.log(response)
    })
  }

  delete(id){
    new TodoApi().delete_fetch(id).then(response => {
      this.reloadList()
      console.log(response)
    })
  }
  

  renderList() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Помилка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Завантаження...</div>
    } else {
      return (
        <ul id='todolist'>
          {items.map(item => (
            <li key={item.id}>
              <input defaultValue={item.text} onBlur={(event)=>{
                event.preventDefault()
                event.stopPropagation()
                this.update(event.target.value, item.check, item.id)
                }} className={ `todoitem ${item.color}` }/>
              <input type="checkbox" checked={item.check} onChange={(event)=>{
                this.update(item.text, event.target.checked, item.id)
               }} />
              <button className='delete' onClick={()=>{this.delete(item.id)}}>X</button>
            </li>
          ))}
        </ul>
      )
    };
  }

  render() {
    return (
      <div>
          <div>
            <label for='new'>Enter what to do</label>
            <input type='text' className='task' id='todo'/>
            <button id='add' onClick={ ()=>{ this.create(this.readNewItem()) } }> ADD </button>
          </div>
          <div id='list'>
            <h1>Your todos</h1>
            { this.renderList() }
          </div>
      </div>  
    )}  
}
