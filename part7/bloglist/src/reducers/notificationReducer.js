import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    },
  },
});

let notificationTimeoutId;
export const setNotificationMessage = (message, duration) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    if (notificationTimeoutId) clearTimeout(notificationTimeoutId);
    notificationTimeoutId = setTimeout(
      () => dispatch(removeNotification()),
      duration * 1000
    );
  };
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
