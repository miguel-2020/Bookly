import loadingStatus from "../helpers/loadingStatus";

export default function handleFavorite(bookID,setLoadingState) {
    
setLoadingState(loadingStatus.adding)
  return fetch('/api/v1/favorite', {
    method: 'PATCH',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { 'content-Type': 'Application/json' },
    body: JSON.stringify({bookID}),
  }).then((response) => {
    console.log(response)
    setLoadingState(loadingStatus.loaded)
    if (response.status == 200) {
      return response.json();
    } 
  });

 
}
