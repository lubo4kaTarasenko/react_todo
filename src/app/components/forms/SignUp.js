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
  read_user(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let user ={
      email: email,
      password: password
    }
    return user
  }

  create_user(user){
    fetch("http://localhost:3001/api/auth",{
    "method": "POST",
    "body": JSON.stringify({
      email: user.email,
      password: user.password
    })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  render() {
    return (
      <div>
        <label for='email'>Email</label>
        <input type='text' id='email'/>
        <label for='password'>Password</label>
        <input type='text' id='password'/>
        <label for='password_confirm'>Password confirm</label>
        <input type='text' id='password_confirm'/>
        <button id='sign_in' onClick={ ()=>{this.create_user(this.read_user())} }> Sign in </button>
      </div>  
    )}  
}
