import { useState } from 'react';
// import Message from './Message';

const BlogForm = ({ handleCreate}) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const addBlog = (e) => {
    e.preventDefault();
    handleCreate({ ...blog });
    setBlog({
      title: '',
      author: '',
      url: '',
    });
  };
  return (
    <>
      {/* {message && <Message message={message} />} */}
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={blog.title}
            name="title"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={blog.author}
            name="author"
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            id="url"
            type="text"
            value={blog.url}
            name="url"
            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
