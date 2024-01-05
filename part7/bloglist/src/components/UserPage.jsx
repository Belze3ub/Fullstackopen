import { Link, useParams } from 'react-router-dom';
import Blog from './Blog';

const UserPage = ({ users }) => {
  const id = useParams().id;
  const user = users.find((user) => user.id === id);
  if (!user) return null;
  return (
    <>
      <h2>
        User: <span className="font-bold">{user.username}</span>
      </h2>
      <h3 className="text-2xl">Added blogs</h3>
      {!user.blogs.length ? (
        <p>This user has no blogs</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <Blog blog={blog} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UserPage;
