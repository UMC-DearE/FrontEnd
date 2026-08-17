import { useToastContext } from '@/components/common/toastContext';

export default function useToast() {
  const ctx = useToastContext();
  return ctx;
}
