import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(username, password));
      navigate('/');
    } catch (error) {
      console.log(error.message)
    }
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
          <div className="flex gap-2">
            <Button id="loginBtn" className="grow">
              Login
            </Button>
            <Button type='button' className="grow" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
