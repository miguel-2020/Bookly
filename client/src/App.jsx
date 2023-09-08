import { Link, useLoaderData } from 'react-router-dom';
import Gallery from './components/Gallery';
import handleLogout from './api/handleLogout';
import useSessionStorageUser from './hooks/useSessionStorage';
import { Suspense } from 'react';


export default function App() {
  const books = useLoaderData();
  const currentUser = useSessionStorageUser()
  return (
    <>
   
      <nav className='flex'>
        <ul className='flex'>
          <li>
          <Link className='loggedUser'>
                {Object.is(currentUser,null)?  "" : currentUser.username}
              </Link>
            </li>
          <li>
            <Link to='/login' onClick={() => handleLogout()}>
              logout
            </Link>
          </li>
          <li>
            <Link to='/favorites'>favorites</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1>
          <a href='/'>
            📚
            <br />
            Bookly
          </a>
        </h1>
        <div className='container'>
          <Gallery books={books} />
        </div>
      </main>

    </>

  );
}
