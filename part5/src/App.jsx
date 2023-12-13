import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Message from './components/Message';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ content: '', type: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setMessage({
        content: `Correctly logged in. Hello ${user.username}`,
        type: 'ok',
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage({ content: 'Wrong username or password', type: 'bad' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    location.reload();
  };

  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await blogService.create(blogObject);
    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs);
    // setMessage({
    //   content: `A new blog ${blog.title} by ${blog.author} added.`,
    //   type: 'ok',
    // });
    // setTimeout(() => {
    //   setMessage(null);
    // }, 5000);
  };

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error updating blog:', error.message);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);
    } catch (error) {
      console.log('Error deleting blog', error.message);
    }
  }

  return (
    <>
      {!user && (
        <>
          <h1>Log in to application</h1>
          {message && <Message message={message} />}
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">username</label>
              <input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          {message && <Message message={message} />}
          <p>
            {`${user.username} logged in`}{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleCreate={handleCreate} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                username={user.username}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default App;
