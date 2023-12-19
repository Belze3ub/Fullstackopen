import { createSlice } from "@reduxjs/toolkit";

let initialState = 'test message';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    }
  }
})

export const {setNotification} = notificationSlice.actions;
export default notificationSlice.reducer;