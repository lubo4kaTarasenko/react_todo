import UserApi from '../../services/UserApi';
import React from 'react';

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
      <div>
        <p><label for='email'>Email</label></p>
          <input type='text' id='email'/>
        <p><label for='password'>Password</label></p>
          <input type='password' id='password'/>
        <p><button id='sign_in' onClick={ ()=>{this.createSession(this.readUser())} }> log in </button></p>
      </div>  
    )}  
}
