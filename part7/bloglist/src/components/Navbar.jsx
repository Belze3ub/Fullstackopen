import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { Button } from './ui/button';

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <>
      <header className="bg-gray-800 p-2">
        <nav className="container flex justify-between items-center text-slate-100">
          <div className="font-bold ">BlogApp</div>
          <ul className="flex gap-2">
            <li>
              <Link to="/">
                <Button variant="link" className="text-slate-100">
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <Button variant="link" className="text-slate-100">
                  Users
                </Button>
              </Link>
            </li>
          </ul>
          {user ? (
            <div className="flex gap-2 items-center">
              <em>{user.username} logged in</em>
              <Button
                onClick={handleLogout}
                variant="link"
                className="text-slate-100"
              >
                logout
              </Button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button variant="link" className="text-slate-100">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="link" className="text-slate-100">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
