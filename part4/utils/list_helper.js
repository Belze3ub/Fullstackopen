const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accu, blog) => accu + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const { title, author, likes, ...rest } = blogs.reduce(
    (max, curr) => (curr.likes > max.likes ? curr : max),
    blogs[0]
  );
  return {
    title,
    author,
    likes,
  };
};

const mostBlogs = (blogs) => {
  const authorBlogCount = blogs.reduce((count, blog) => {
    const author = blog.author;
    count[author] = count[author] ? count[author]++ : (count[author] = 1);
    return count;
  }, {});
  return Object.entries(authorBlogCount).map(([author, blogs]) => ({
    author,
    blogs,
  }));
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
