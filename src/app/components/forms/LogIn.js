import UserApi from '../../services/UserApi';

var React = require('react');
var ReactDOM = require('react-dom');

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
      this.ifError(response)
      console.log(response)
      api.userTokenSave(response.token)
      this.props.afterLoggedIn()
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
        <p><button id='sign_in' onClick={ ()=>{this.createSession(this.readUser())} }> log in </button></p>
      </div>  
    )}  
}
