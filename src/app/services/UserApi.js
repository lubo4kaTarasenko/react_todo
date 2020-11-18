export default class UserApi{

  createUserFetch(user){
    return fetch("http://localhost:3001/api/auth",{
      "method": "POST",
      "body": JSON.stringify({
        email: user.email,
        password: user.password
      })
      })
      .then(response => response.json())
      .catch(err => {
        console.log(err);
    });
  }  
  
  createSessionFetch(user){
    return fetch("http://localhost:3001/api/auth",{
    "method": "PUT",
    "body": JSON.stringify({
      email: user.email,
      password: user.password
    })
    })
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
  }

  userTokenSave(token){
    localStorage.setItem('token', token)
  }

  userTokenPresent(){
    return localStorage.getItem('token')
  }
}
