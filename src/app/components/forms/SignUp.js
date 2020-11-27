import UserApi from '../../services/UserApi';
import React from 'react';
import { Paper, Button, TextField} from '@material-ui/core';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    }
  }
  readUser(){
    const email = document.getElementById('email').value
    const password = this.checkPasswordConfirmationCorrect()
    const user ={
      email: email,
      password: password
    }
    return user
  }

  createUser(user){
    if (user.password == null) return;
    const api  = new UserApi()
    api.createUserFetch(user).then(response => {
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

  checkPasswordConfirmationCorrect(){
    const password = document.getElementById('password').value
    const password_confirm = document.getElementById('password_confirm').value
    if (password == password_confirm){
      return password
    }
    else{
      alert("passwords don't match")
      return null
    }
  }
  
  render() {
    return (
      <Paper elevation={3} className='create_cont'>
        <div className="login_cont">
            <p><TextField label="Email:"  variant="outlined" id='email'/></p>
            <p><TextField label="Password:"  variant="outlined" type='password' id='password'/></p>
            <p><TextField label='Password confirm:' variant="outlined" type='password' id='password_confirm'/></p>
            <p><Button variant="contained" color="primary" id='sign_in' onClick={ ()=>{this.createUser(this.readUser())} }> Sign up </Button></p>
        </div> 
      </Paper> 
    )}  
}
