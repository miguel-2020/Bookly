import { Link } from 'react-router-dom';
import { ArticleContext } from '../articleContext';
import bookTypes from '../types/bookTypes';
import useRatings from '../hooks/useRatings';
import { useContext, useState } from 'react';
import handleFavorite from '../api/handleFavorite';
import loadingStatus from '../helpers/loadingStatus';
import LoadingIndicator from './loadingIndicator';
export default function Article({ book }) {
  const setShowing = useContext(ArticleContext);
  const [average, _, totalRatings] = useRatings(book.starsAndNumberOfVotes);
  const [loadingState, setLoadingState] = useState(loadingStatus.isLoading);
  const [imageLoadingState, setImageLoadingState] = useState(loadingStatus.isLoading);

  return (
    <article className='flex'>
      <header>
        <img
          onLoad={() => setImageLoadingState(loadingStatus.loaded)}
          src={book.pictureUrl}
          alt={book.pictureDesc}
          style={{ display: imageLoadingState == 'loaded' ? 'block' : 'none' }}
        />

        {imageLoadingState == loadingStatus.isLoading ? (
          <LoadingIndicator loadingState={imageLoadingState} />
        ) : (
          ''
        )}
      </header>
      <div className='content'>
        <h2 onClick={() => setShowing(book)}>
          <Link to=''>{book.title}</Link>
        </h2>
        <p>by {book.author}</p>
        <small>avg rating {average != null ? average : 'N/A'} —</small>
        <small>{totalRatings != null ? totalRatings : 0} ratings —</small>
        <small>published {book.published} </small>
      </div>
      <footer className='flex'>
        <button onClick={() => handleFavorite(book.id, setLoadingState)}>
          {loadingState == loadingStatus.adding ? loadingState : 'I want to read'}
        </button>

        <small>Rate this book</small>
        <ul className='rating-list'>
          <li>★</li>
          <li>★</li>
          <li>★</li>
          <li>★</li>
          <li>★</li>
        </ul>
      </footer>
    </article>
  );
}

Article.propTypes = bookTypes;
