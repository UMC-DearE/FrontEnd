import { useToastContext } from "@/components/common/ToastProvider";

export default function useToast() {
  const ctx = useToastContext();
  return ctx;
}
