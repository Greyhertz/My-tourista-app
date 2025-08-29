import { createContext, useContext } from 'react';
import { toast } from 'sonner';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationContextType {
  addNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  addNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  function addNotification(message: string, type: NotificationType) {
    const baseStyles = ' px-4 py-3 text-white shadow-md';

    if (type === 'success') {
      toast.success(message, {
        duration: 3000,
        className: `${baseStyles} bg-green-500`,
      });
    }

    if (type === 'error') {
      toast.error(message, {
        duration: 4000,
        className: `${baseStyles} bg-destructive`,
      });
    }

    if (type === 'info') {
      toast.info(message, {
        duration: 2500,
        className: 'bg-blue-500',
      });
    }
  }

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
