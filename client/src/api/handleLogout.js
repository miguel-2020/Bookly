export default function handleLogout() {
  fetch('/api/v1/logout', { method: 'POST' }).then((_) => {
    sessionStorage.clear();
  });
}
