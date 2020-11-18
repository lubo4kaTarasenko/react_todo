import UserApi from '../../services/UserApi';

var React = require('react');
var ReactDOM = require('react-dom');

export default class SignUp extends React.Component {
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

  createUser(user){
    let api  = new UserApi()
    api.createUserFetch(user).then(response => {
    this.ifError(response)
    console.log(response)
    api.userTokenSave(response.token)
    })
  }

  ifError(js){
    if (js.error){
      alert(js.error)
    }
  }
  
  render() {
    return (
      <div>
        <p><label for='email'>Email</label></p>
          <input type='text' id='email'/>
        <p><label for='password'>Password</label></p>
          <input type='text' id='password'/>
        <p><label for='password_confirm'>Password confirm</label></p>
          <input type='text' id='password_confirm'/>
        <p><button id='sign_in' onClick={ ()=>{this.createUser(this.readUser())} }> Sign up </button></p>
      </div>  
    )}  
}
