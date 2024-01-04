import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationMessage } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(
        setNotificationMessage(
          {
            content: `Correctly logged in. Hello ${user.username}`,
            type: 'ok',
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        setNotificationMessage(
          {
            content: 'Wrong username or password',
            type: 'bad',
          },
          5
        )
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    location.reload();
  };

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog);
      const updatedBlogs = await blogService.getAll();
      // setBlogs(updatedBlogs);
      dispatch(
        setNotificationMessage(
          {
            content: `'${blog.title} by ${blog.author}' upvoted.`,
            type: 'ok',
          },
          5
        )
      );
    } catch (error) {
      console.error('Error updating blog:', error.message);
    }
  };

  // const deleteBlog = async (blogId) => {
  //   try {
  //     await blogService.deleteBlog(blogId);
  //     const updatedBlogs = await blogService.getAll();
  //     // setBlogs(updatedBlogs);
  //   } catch (error) {
  //     console.log('Error deleting blog', error.message);
  //   }
  // };

  return (
    <>
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
          <h2>blogs</h2>
          <p>
            {`${user.username} logged in`}{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                // deleteBlog={deleteBlog}
                username={user.username}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default App;
