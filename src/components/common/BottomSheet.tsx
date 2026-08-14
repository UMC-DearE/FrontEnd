// 공통 바텀 시트

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function BottomSheet({
  open,
  onClose,
  children,
  className = '',
  contentClassName = '',
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        // AnimatePresence의 직계 자식은 key를 가진 motion 컴포넌트여야 exit이 전파됨
        <motion.div
          key="bottom-sheet"
          className="fixed inset-0 z-50 flex items-end justify-center"
          role="dialog"
          aria-modal="true"
        >
          <motion.button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className={`relative z-10 w-full max-w-[440px] overflow-hidden rounded-t-[24px] bg-white pt-[16px] pb-[60px] ${className}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40, mass: 0.8 }}
          >
            <div className={`flex w-full flex-col items-center ${contentClassName}`}>
              <div className="h-[5px] w-[36px] shrink-0 rounded-full bg-[#E7E8EB]" />
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
