// 공통 바텀 시트

import type { ReactNode } from 'react';

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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        className={`relative z-10 w-full max-w-[440px] rounded-t-[24px] bg-white pt-[16px] ${className}`}
      >
        <div className={`flex w-full flex-col items-center ${contentClassName}`}>
          <div className="h-[5px] w-[36px] shrink-0 rounded-full bg-[#E7E8EB]" />
          {children}
        </div>
      </div>
    </div>
  );
}
