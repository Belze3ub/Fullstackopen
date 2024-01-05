import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducers/userReducer';
import './Navbar.css'

const Navbar = ({ username }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    location.reload();
  };
  return (
    <div className="navbar-container">
      <ul className="navbar-navigation">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      {username && (
        <p>
          {`${username} logged in`}{' '}
          <button onClick={handleLogout}>logout</button>
        </p>
      )}
    </div>
  );
};

export default Navbar;
