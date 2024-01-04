import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { login, logout, setUser } from './reducers/userReducer';
import { Link, Route, Routes } from 'react-router-dom';
import BlogsPage from './components/BlogsPage';
import UsersPage from './components/UsersPage/UsersPage';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const handleLogout = () => {
    dispatch(logout());
    location.reload();
  };

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
      {notification && <Notification notification={notification} />}
      <h1>Blog App</h1>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          <p>
            {`${user.username} logged in`}{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          {/* <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
              />
            ))}
        </div> */}
          <Routes>
            <Route path="/" element={<BlogsPage user={user} blogs={blogs} />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
