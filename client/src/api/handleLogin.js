import base64 from 'base-64';
import { redirect } from 'react-router-dom';
import { setSessionStorage } from '../helpers/configSessionStorage';
import inputsCriteria from "../helpers/inputsCriteria"


export default async function handleLogin({ request }) {
  const formData = await request.formData();
  const errorHtml =  document.querySelector(".error")
  

    if(!inputsCriteria([...formData.values()])){
        errorHtml.textContent = "You must provide a username and password"
        return null;
    }

  const [username,password] = await formData.values();
  
  const headers = new Headers();
  headers.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
  const requestObj = new Request('/api/v1/login', {
    headers: headers,
    mode: 'same-origin',
    redirect: 'follow',
    method: 'POST',
    credentials: 'include',
  });

  const books = await fetch(requestObj)
  .then((response)=>{
    if(response.status == 200){

      return response.json();
    }else{
      errorHtml.textContent = "Either your credentials are invalid, or the username doesnt exist yet."
      return null
    }
  })

  if(books){
    setSessionStorage({...books.data})
    return redirect('/');
  }


  return null
  
}
