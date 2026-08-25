import React, { useCallback, useState } from 'react';
import { ToastContext } from './toastContext';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const show = useCallback((msg: string, duration = 1500) => {
    setMessage(msg);
    setVisible(true);
    window.setTimeout(() => setVisible(false), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {visible && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-[120px] z-50 inline-flex whitespace-pre-line max-w-[360px] px-2 py-2 bg-black text-white rounded-lg text-sm shadow-md text-center break-words justify-center">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
