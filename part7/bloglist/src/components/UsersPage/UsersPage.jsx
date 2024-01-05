import { Button } from '../ui/button';
import './UsersPage.css';
import { Link } from 'react-router-dom';

const UsersPage = ({ users }) => {
  if (!users) return null;
  return (
    <>
      <h2 className="font-bold text-2xl">Users</h2>
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
              <td>
                <Link to={`/users/${user.id}`}>
                  <Button variant='link'>{user.username}</Button>
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
