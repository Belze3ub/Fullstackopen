import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';
import { setNotificationMessage } from './notificationReducer';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      console.log(`There was an error while fetching users: ${error.message}`);
    }
  };
};

export const createUser = (newUser) => {
  return async (dispatch) => {
    try {
      await usersService.create(newUser);
      const users = await usersService.getAll();
      dispatch(setUsers(users));
      dispatch(
        setNotificationMessage(
          {
            content: 'New user created',
            type: 'ok',
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        setNotificationMessage(
          {
            content: `There was an error while creating new user: ${error.response.data.error}`,
            type: 'bad',
          },
          5
        )
      );
      throw error;
    }
  };
};

export default usersSlice.reducer;
