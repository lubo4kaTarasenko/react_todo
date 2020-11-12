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
    fetch("http://localhost:3001/api/items")
    .then(res => res.json())
    .then(
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
    console.log(e)
    fetch("http://localhost:3001/api/items",{
    "method": "POST",
    "body": JSON.stringify({
      text: e.text,
      color: e.color,
      check: e.check
    })
   })
   .then(response => response.json())
   .then(response => {
     this.reloadList()
     console.log(response)
   })
   .catch(err => {
     console.log(err);
   });
  }

  update(itemText, itemCheck, itemId){
   // console.log(item)
    fetch("http://localhost:3001/api/items",{
    "method": "PUT",
    "body": JSON.stringify({
      id: itemId,
      text: itemText,
      color: 'red',
      check: itemCheck
    })
   })
   .then(response => response.json())
   .then(response => {
     this.reloadList()
     console.log(response)
   })
   .catch(err => {
     console.log(err);
   });
  }

  delete(id){
    console.log(id)
    fetch(`http://localhost:3001/api/items?id=${id}`,{
      "method": "DELETE"})
     .then(response => response.json())
     .then(response => {
       this.reloadList()
       console.log(response)
     })
     .catch(err => {
       console.log(err);
     });
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
