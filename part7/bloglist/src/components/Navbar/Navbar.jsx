import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducers/userReducer';
import { Button } from '../ui/button';

const Navbar = ({ username }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    location.reload();
  };
  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 p-2 text-slate-100">
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
        {username && (
          <p>
            {`${username} logged in`}{' '}
            <Button
              onClick={handleLogout}
              variant="link"
              className="text-slate-100"
            >
              logout
            </Button>
          </p>
        )}
      </div>
    </>
  );
};

export default Navbar;
