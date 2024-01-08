import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import UserService from '../services/users';
import { setNotificationMessage } from '@/reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '@/reducers/usersReducer';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const newUsername = event.target.querySelector('#username').value;
    const newName = event.target.querySelector('#name').value;
    const newPassword = event.target.querySelector('#password').value;
    const newUser = {
      username: newUsername,
      name: newName,
      password: newPassword,
    };
    try {
      await dispatch(createUser(newUser));
      navigate('/login');
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <>
      <h2 className="text-2xl text-center mt-5 mb-3">
        Register to application
      </h2>
      <div className="flex justify-center">
        <form onSubmit={handleRegister} className="w-4/12 max-w-2xl">
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
            <label htmlFor="name">Name</label>
            <Input
              className="my-2"
              placeholder="name"
              id="name"
              type="text"
              value={name}
              name="Name"
              onChange={(e) => setName(e.target.value)}
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
          <Button className="w-full">Register</Button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
