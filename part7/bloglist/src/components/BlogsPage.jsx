import React from 'react';
import BlogForm from './BlogForm';
import Blog from './Blog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const BlogsPage = ({ blogs }) => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Blogs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Blog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new blog</DialogTitle>
            </DialogHeader>
            <BlogForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-5">
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link key={blog.id} to={`blogs/${blog.id}`}>
              <Blog blog={blog} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default BlogsPage;
