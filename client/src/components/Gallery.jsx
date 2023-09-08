import { Suspense, useState } from 'react';
import Article from './Article';
import Details from './Details';
import PropTypes from 'prop-types';
import { ArticleContext } from '../articleContext';
import loadingStatus from '../helpers/loadingStatus';


export default function Gallery({ books }) {
  const [showing, setShowing] = useState(null);
  const [loadingState,setLoadingState] = useState(loadingStatus.loaded)
  
  return (
    <>
           
      {showing != null ? (

        <Details book={showing} />
       
      ) : (
        <ArticleContext.Provider value={setShowing}>
          {books.map((book) => (
            <Article key={book.id} book={book}/>
          ))}
        </ArticleContext.Provider>
      )}
    </>
  );
}

Gallery.propTypes = {
  books: PropTypes.array,
};

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

