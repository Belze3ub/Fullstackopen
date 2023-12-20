import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const useSetNotificationFn = () => {
  const all = useContext(NotificationContext);
  return all[1];
};

export default useSetNotificationFn;