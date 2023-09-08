import { redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useSessionStorageUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let temp = sessionStorage.getItem('user');

    temp = !Object.is(temp, null) ? JSON.parse(temp) : redirect('/login');

    setUser({ ...temp });
  }, []);

  return user;
}
