import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type NotificationType = 'info' | 'warning' | 'error';

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  notification: Notification | null;
  showNotification: (message: string, type: NotificationType) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setNotification({ message, type });
    // Automatically hide the notification after a delay
    setTimeout(() => {
      hideNotification();
    }, 5000);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
