import useRatings from '../hooks/useRatings';
import bookTypes from '../types/bookTypes';

export default function Details({ book }) {
const [average,stars] = useRatings(book.starsAndNumberOfVotes)
  return (
    <div className='details'>
      <div className='col-1'>
        <img src={book.pictureUrl} alt={book.pictureDesc} />
        <ul className='rating-list'>
          {stars.length > 0 ? stars.map((_, i) => <li key={i}>★</li>) : ''}
        </ul>
      </div>

      <div className='col-2'>
        <h1>{book.title}</h1>
        <p>by {book.author}</p>

        <ul>
          <li>
            <span>Ratings {average != null ? average : 'N/A'}</span> .{' '}
            <span>8 want to read</span>
          </li>
        </ul>

        <ul>
          <li className='tile'>
            <small>Publish Date</small>
            <p>{book.published}</p>
          </li>
          <li className='tile'>
            <small>Language</small>
            <p>{book.language}</p>
          </li>
        </ul>
        <p>{book.description}</p>
      </div>
    </div>
  );
}

Details.propTypes = bookTypes
