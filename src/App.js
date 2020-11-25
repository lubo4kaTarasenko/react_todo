import TodoList from './app/components/TodoList';
import SignUp from './app/components/forms/SignUp';
import LogIn from './app/components/forms/LogIn';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

import UserApi from './app/services/UserApi';
import React from 'react';
import {
  AppBar, Toolbar,   Button,
  Typography
} from '@material-ui/core';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTokenPresent: new UserApi().userTokenPresent()       
    }
  }
  
  render() {
    return (
      <Router>
      <div>
        <AppBar position="static">
         
          {this.renderIfAuth()}
  
        </AppBar>
        <Switch>
          <Route path="/sign_up">
            {this.state.isTokenPresent ? <Redirect to="/"/> : <SignUp afterLoggedIn={()=>{this.syncToken()}}/> }            
          </Route>
          <Route path="/log_in">
            {this.state.isTokenPresent ? <Redirect to="/"/>  : <LogIn afterLoggedIn={()=>{this.syncToken()}}/> }  
          </Route>
          <Route path="/">
            {this.state.isTokenPresent && <TodoList />}
          </Route>
        </Switch>
      </div>
    </Router>
    )}

    syncToken(){
      const isTokenPresent = new UserApi().userTokenPresent()
      this.setState({isTokenPresent})
    }

    handleLogOut(event){
      event.preventDefault()
      event.stopPropagation()
      new UserApi().deleteSession()
      this.syncToken()
    }

    renderIfAuth(){
      if (!this.state.isTokenPresent){
        return(
          <Toolbar className='nav_cont'>    
            <Button><Link to="/sign_up">Sign up</Link></Button>
            <Button><Link to="/log_in">Log in</Link></Button>          
            <h3>Todo app</h3>          
          </Toolbar>       
      )}
      else{
        return(
          <Toolbar className='nav_cont'>       
             <Button variant='outlined'color='primary.dark'><Link to="/">Home</Link></Button>
             <span class="margins">  <Button variant='outlined' color='primary.dark'> <a href='/' onClick={(event)=>{ this.handleLogOut(event) }}>log out</a></Button></span>
             <span class="margins"> <h3>Todo app</h3>  </span> 
          </Toolbar> 
      )}
    }    
}
