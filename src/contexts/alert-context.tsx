'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'info';

interface Alert {
  type: AlertType;
  message: string;
}

interface AlertContextType {
  alert: Alert | null;
  showAlert: (type: AlertType, message: string) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const clearAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};
