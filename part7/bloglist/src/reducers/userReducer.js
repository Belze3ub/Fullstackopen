import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotificationMessage } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(
        setNotificationMessage(
          {
            content: `Correctly logged in. Hello ${user.username}`,
            type: 'ok',
          },
          5
        )
      );
    } catch (error) {
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
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
