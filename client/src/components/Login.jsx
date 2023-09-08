import { Form } from 'react-router-dom';
import '../css/Login.css';

export default function Login() {
  return (
    <main className='wrapper'>
      <h1>
        📚
        <br />
        Bookly
      </h1>
      <Form method='post' action='/login' className='login'>
        <div className='form-group'>
          <input type='text' placeholder='' id='name' name='username' required />
          <label className='pos-absolute' htmlFor='name'>
            full name
          </label>
        </div>
        <small>
          Your username must contain letters and numbers only.
        </small>
        <div className='form-group'>
          <input type='text' placeholder='' id='password' name='password' required />
          <label className='pos-absolute' htmlFor='password'>
            password
          </label>
        </div>
        <small>
          Your password must contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
        </small>
        <p className='error'></p>
        <button>submit</button>
      </Form>
    </main>
  );
}
