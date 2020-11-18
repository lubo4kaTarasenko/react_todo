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

  createUser(user){
    fetch("http://localhost:3001/api/auth",{
    "method": "PUT",
    "body": JSON.stringify({
      email: user.email,
      password: user.password
    })
    })
    .then(response => response.json())
    .then(response => {
      this.ifError(response)
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
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
        <p><button id='sign_in' onClick={ ()=>{this.createUser(this.readUser())} }> log in </button></p>
      </div>  
    )}  
}
