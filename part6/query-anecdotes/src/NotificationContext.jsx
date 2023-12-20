import { createContext, useContext, useReducer, useRef } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'REMOVE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  const timeoutRef = useRef(null);

  const setNotificationMessage = (message) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: message,
    });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(
      () =>
        notificationDispatch({
          type: 'REMOVE_NOTIFICATION',
        }),
      5000
    );
  };

  return (
    <NotificationContext.Provider
      value={[notification, setNotificationMessage]}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
