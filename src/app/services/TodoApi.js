import UserApi from "./UserApi";

export default class TodoApi{

  createFetch(e){
    const token = new UserApi().userTokenPresent()
    return fetch(`http://localhost:3001/api/items?token=${token}`,{
      "method": "POST",
      "body": JSON.stringify({
        text: e.text,
        color: e.color,
        check: e.check
      })
     })
     .then(response => response.json())
     .catch(err => {
       console.log(err);
     });
  }

  readFetch(){
    const token = new UserApi().userTokenPresent()
    return fetch(`http://localhost:3001/api/items?token=${token}`)
    .then(res => res.json())
  }

  updateFetch(itemText, itemCheck, itemId, itemColor){
    const token = new UserApi().userTokenPresent()
    return fetch(`http://localhost:3001/api/items?token=${token}`,{
    "method": "PUT",
    "body": JSON.stringify({
      id: itemId,
      text: itemText,
      color: itemColor,
      check: itemCheck
    })
   })
   .then(response => response.json())   
   .catch(err => {
     console.log(err);
   });
  }

  deleteFetch(id){
    const token = new UserApi().userTokenPresent()
    return fetch(`http://localhost:3001/api/items?token=${token}&id=${id}`,{
      "method": "DELETE"})
     .then(response => response.json())
     .catch(err => {
       console.log(err);
     });
  }
}