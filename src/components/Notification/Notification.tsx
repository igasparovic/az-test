import React from 'react';
import styles from './Notification.module.scss';
import {useNotification} from "@/context/NotificationContext";

const Notification = () => {
  const { notification, hideNotification } = useNotification();
  if (!notification) return null;

  const notificationClass = `${styles.notificationContainer} ${styles[notification.type]}`;

  return (
    <div className={notificationClass}>
      {notification.message}
      <button onClick={hideNotification} className={styles.closeButton}>
        X
      </button>
    </div>
  );
};

export default Notification;
