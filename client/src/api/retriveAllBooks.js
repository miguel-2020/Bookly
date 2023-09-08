import { redirect } from "react-router-dom";
export default async function retrieveAllBooks() {
 const response = await fetch('/api/v1', {
    method: 'GET',
  });


  if(response.status != 200){
    
    return redirect("/login")
  }

  const data = await response.json();
  return data.data;
}
