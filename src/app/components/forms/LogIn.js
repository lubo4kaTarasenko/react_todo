import UserApi from '../../services/UserApi';
import React from 'react';
import { Paper, Button, TextField} from '@material-ui/core';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    }
  }
  readUser(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let user ={
      email: email,
      password: password
    }
    return user
  }

  createSession(user){
    let api = new UserApi()
    api.createSessionFetch(user).then(response => {
      if(response.error) {
        this.handleError(response);
        return;
      }
      console.log(response)
      api.userTokenSave(response.token)
      this.props.afterLoggedIn()
    })
  }

  handleError(js){
    alert(js.error);
  }
  
  render() {
    return (
      <Paper elevation={3} className='create_cont'>
        <div className="login_cont">
          <p><TextField label="Email:"  variant="outlined" id='email'/></p>
          <p><TextField label="Password:"  variant="outlined" type='password' id='password'/></p>
          <p><Button variant="contained" color="primary" id='sign_in' onClick={ ()=>{this.createSession(this.readUser())} }> log in </Button></p>
        </div>
      </Paper>  
    )}  
}
