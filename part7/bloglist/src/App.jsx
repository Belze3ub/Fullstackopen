import { useEffect } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { Route, Routes } from 'react-router-dom';
import BlogsPage from './components/BlogsPage';
import UsersPage from './components/UsersPage/UsersPage';
import UserPage from './components/UserPage';
import { getAllUsers } from './reducers/usersReducer';
import BlogPage from './components/BlogPage';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getAllUsers());
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Navbar username={user.username} />
      {notification && <Notification notification={notification} />}
      <h1>Blog App</h1>
      {!user && (
        <LoginForm />
      )}
      {user && (
        <div>
          <Routes>
            <Route path="/" element={<BlogsPage blogs={blogs} />} />
            <Route path="/users" element={<UsersPage users={users} />} />
            <Route path="/users/:id" element={<UserPage users={users} />} />
            <Route
              path="/blogs/:id"
              element={<BlogPage blogs={blogs} user={user} />}
            />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
