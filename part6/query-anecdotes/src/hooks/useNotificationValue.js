import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const useNotificationValue = () => {
  const all = useContext(NotificationContext);
  return all[0];
};

export default useNotificationValue;