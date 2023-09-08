export function setSessionStorage({ username, role }) {
  sessionStorage.setItem('user', JSON.stringify({ username, role }));
}
