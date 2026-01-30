import React, { createContext, useCallback, useContext, useState } from "react";

type ToastContextValue = {
  show: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const show = useCallback((msg: string, duration = 1200) => {
    setMessage(msg);
    setVisible(true);
    window.setTimeout(() => setVisible(false), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {visible && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-[120px] z-50 px-4 py-2 bg-black text-white rounded-lg text-sm shadow-md">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("토스트 컨텍스트가 존재하지 않습니다.");
  return ctx;
}

export default ToastProvider;
