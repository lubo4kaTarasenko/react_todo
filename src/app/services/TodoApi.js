export default class TodoApi{

  createFetch(e){
    return fetch("http://localhost:3001/api/items",{
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
    return fetch("http://localhost:3001/api/items")
    .then(res => res.json())
  }

  updateFetch(itemText, itemCheck, itemId){
    return fetch("http://localhost:3001/api/items",{
    "method": "PUT",
    "body": JSON.stringify({
      id: itemId,
      text: itemText,
      color: 'red',
      check: itemCheck
    })
   })
   .then(response => response.json())   
   .catch(err => {
     console.log(err);
   });
  }

  deleteFetch(id){
    return fetch(`http://localhost:3001/api/items?id=${id}`,{
      "method": "DELETE"})
     .then(response => response.json())
     .catch(err => {
       console.log(err);
     });
  }
}