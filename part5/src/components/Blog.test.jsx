import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders title and author by default, but not URL or likes', () => {
  const blog = {
    title: 'fullstackopen',
    author: 'unknown',
    url: 'www.google.com',
    likes: 3,
    user: {
      username: 'test',
    },
  };

  render(<Blog blog={blog} />);

  expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeInTheDocument();
  expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
  expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument();
});

test('renders URL and likes when the "view" button is clicked', () => {
  const blog = {
    title: 'fullstackopen',
    author: 'unknown',
    url: 'www.google.com',
    likes: 3,
    user: {
      username: 'test',
    },
  };

  render(<Blog blog={blog} />);

  expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
  expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('view'));

  expect(screen.queryByText(blog.url)).toBeInTheDocument();
  expect(screen.queryByText(`likes ${blog.likes}`)).toBeInTheDocument();
});
