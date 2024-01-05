import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { Button } from './ui/button';
import { Input } from './ui/input';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };
  return (
    <>
      <h2 className="text-2xl text-center mt-5 mb-3">Log in to application</h2>
      <div className="flex justify-center">
        <form onSubmit={handleLogin} className="w-4/12 max-w-2xl">
          <div>
            <label htmlFor="username">Username</label>
            <Input
              className="my-2"
              placeholder="username"
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              className="my-2"
              placeholder="password"
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button id="loginBtn" className='w-full'>Login</Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
