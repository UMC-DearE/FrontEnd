import { createContext, useContext } from 'react';

export type ToastContextValue = {
  show: (message: string, duration?: number) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('토스트 컨텍스트가 존재하지 않습니다.');
  return ctx;
}
