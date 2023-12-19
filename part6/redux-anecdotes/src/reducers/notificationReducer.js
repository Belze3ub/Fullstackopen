import { createSlice } from '@reduxjs/toolkit';

let initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    }
  },
});

export const setNotificationMessage = (message, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(removeNotification()), duration * 1000)
  };
};

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
