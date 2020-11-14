import TodoApi from '../services/TodoApi';
import SelectColor from './SelectColor';

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
    new TodoApi().readFetch().then(
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
    newItem.value = ''
    let newItemColor = document.getElementById('addColor').value
    let newItemCheck = false
    let item = {
      text: newItemText,
      color: newItemColor,
      check: newItemCheck
    }
    return item
  }

  createNewItem(e){
    new TodoApi().createFetch(e).then(response => {
      this.reloadList()
      console.log(response)
    })
  }

  updateItem(itemText, itemCheck, itemId, itemColor){
   new TodoApi().updateFetch(itemText, itemCheck, itemId, itemColor).then(response => {
      this.reloadList()
      console.log(response)
    })
  }

  deleteItem(id){
    new TodoApi().deleteFetch(id).then(response => {
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
                this.updateItem(event.target.value, item.check, item.id, item.color)
                }} className={ `todoitem ${item.color} ${item.check}` }/>
              <input type="checkbox" checked={item.check} onChange={(event)=>{
                this.updateItem(item.text, event.target.checked, item.id, item.color)
               }} />
              <SelectColor value={item.color} onChange={(event)=>{
                this.updateItem(item.text, item.check, item.id, event.target.value )
              }}></SelectColor>
              <button className='delete' onClick={()=>{this.deleteItem(item.id)}}>X</button>
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
            <SelectColor id={'addColor'}></SelectColor>
            <button id='add' onClick={ ()=>{ this.createNewItem(this.readNewItem()) } }> ADD </button>
          </div>
          <div id='list'>
            <h1>Your todos</h1>
            { this.renderList() }
          </div>
      </div>  
    )}  
}
