import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('BlogForm handles callback function', async () => {
  const handleCreate = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm handleCreate={handleCreate} />);

  const title = container.querySelector('#title');
  const author = container.querySelector('#author');
  const url = container.querySelector('#url');
  const createBlog = screen.getByText('create');

  await user.type(title, 'test title');
  await user.type(author, 'test author');
  await user.type(url, 'test url');

  await user.click(createBlog)

  expect(handleCreate.mock.calls).toHaveLength(1);
  expect(handleCreate.mock.calls[0][0].title).toBe('test title');
  expect(handleCreate.mock.calls[0][0].author).toBe('test author');
  expect(handleCreate.mock.calls[0][0].url).toBe('test url');
});
