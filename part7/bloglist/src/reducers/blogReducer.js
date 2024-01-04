import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotificationMessage } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    // addBlog(state, action) {
    //   state.push(action.payload)
    // }
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      const updatedBlogs = await blogService.getAll();

      dispatch(setBlogs(updatedBlogs));

      dispatch(
        setNotificationMessage(
          {
            content: `A new blog ${newBlog.title} by ${newBlog.author} added.`,
            type: 'ok',
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        setNotificationMessage(
          {
            content: 'There was an error while trying to create a new blog.',
            type: 'bad',
          },
          5
        )
      );
      console.error(`Error creating blog: ${error.message}`);
    }
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogId);
      const updatedBlogs = await blogService.getAll();
      dispatch(setBlogs(updatedBlogs));
      dispatch(
        setNotificationMessage(
          {
            content: 'Successfully deleted',
            type: 'ok',
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        setNotificationMessage(
          {
            content: `Error deleting blog: ${error.message}`,
            type: 'bad',
          },
          5
        )
      );
    }
  };
};

export const upvoteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog);
      const updatedBlogs = await blogService.getAll();
      dispatch(setBlogs(updatedBlogs));
      dispatch(
        setNotificationMessage(
          {
            content: `${updatedBlog.title} upvoted`,
            type: 'ok',
          },
          3
        )
      );
    } catch (error) {
      dispatch(
        setNotificationMessage(
          {
            content: `Error upvoting blog: ${error.message}`,
            type: 'bad',
          },
          3
        )
      );
    }
  };
};

export default blogSlice.reducer;
