import { useEffect } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { Navigate, Route, Routes } from 'react-router-dom';
import BlogsPage from './components/BlogsPage';
import UsersPage from './components/UsersPage/UsersPage';
import UserPage from './components/UserPage';
import { getAllUsers } from './reducers/usersReducer';
import BlogPage from './components/BlogPage';
import Navbar from './components/Navbar/Navbar';
import RegisterForm from './components/RegisterForm';

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
      <Navbar user={user} />
      {notification && <Notification notification={notification} />}
      <h1 className="text-3xl font-bold">Blog App</h1>
      <div>
        <Routes>
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route
              path="/"
              element={
                user ? <BlogsPage blogs={blogs} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/users"
              element={
                user ? <UsersPage users={users} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/users/:id"
              element={
                user ? <UserPage users={users} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/blogs/:id"
              element={
                user ? (
                  <BlogPage blogs={blogs} user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </>
        </Routes>
      </div>
    </>
  );
};

export default App;
