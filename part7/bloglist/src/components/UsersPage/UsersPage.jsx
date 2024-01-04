import { useEffect, useState } from 'react';
import usersService from '../../services/users';
import './UsersPage.css'

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const allUsers = await usersService.getAll();
      setUsers(allUsers);
    })();
  }, []);
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
