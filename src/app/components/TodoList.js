import TodoApi from '../services/TodoApi';
import SelectColor from './SelectColor';
import React from 'react';
import {
  Checkbox,
  Button,
  TextField,
  Container
} from '@material-ui/core';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

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
    const newItem = document.getElementById('todo')
    const newItemText = newItem.value
    newItem.value = ''
    const newItemColor = document.getElementById('addColor').value
    const newItemCheck = false
    const item = {
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

  updateItemOnTextChanged(event, item){
    event.preventDefault()
    event.stopPropagation()
    this.updateItem(event.target.value, item.check, item.id, item.color)
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
              <TextField variant="outlined" defaultValue={item.text} onBlur={ (event)=>{this.updateItemOnTextChanged(event, item)}}
               className={ `todoitem ${item.color} ${item.check}` }/>
              <Checkbox icon={<FavoriteBorder />}  checked={item.check}  checkedIcon={<Favorite />} onChange={(event)=>{
                this.updateItem(item.text, event.target.checked, item.id, item.color)
               }} />
              <SelectColor value={item.color} onChange={(event)=>{
                this.updateItem(item.text, item.check, item.id, event.target.value )
              }}></SelectColor>
              <span class='margins'>
              <Button variant="contained" color="secondary" className='delete' onClick={()=>{this.deleteItem(item.id)}}>Delete</Button>
              </span>
            </li>
          ))}
        </ul>
      )
    };
  }

  render() {
    return (
      <div>
          <Container id='create_cont'>
            <TextField label="Enter what to do:" variant="outlined"  className='task' id='todo'/>
            <span class='margins'><SelectColor id={'addColor'}></SelectColor></span>
            <span class='margins'><Button variant="outlined" size={'large'} color="primary" id='add' onClick={ ()=>{ this.createNewItem(this.readNewItem()) } }> ADD </Button></span>
          </Container>
          <Container id='list'>
            <h1>Your todos</h1>
            { this.renderList() }
          </Container>
      </div>  
    )}  
}
