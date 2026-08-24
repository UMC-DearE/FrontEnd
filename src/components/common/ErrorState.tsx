// 에러 안내 공통 표현부

import type { ReactNode } from 'react';
import ErrorIcon from '@/assets/common/error.svg';

interface ErrorStateProps {
  title: string;
  description: ReactNode;
  notice?: ReactNode;
  action?: ReactNode;
}

export function ErrorState({ title, description, notice, action }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-[12px]">
      <div className="flex flex-col items-center gap-[16px]">
        <img src={ErrorIcon} alt="" className="h-[40px] w-[40px] shrink-0" />

        <p className="text-center text-[18px] font-semibold leading-[1.5] text-[#121212]">
          {title}
        </p>
      </div>

      {notice && (
        <p className="text-center text-[14px] font-medium leading-[1.5] text-[#121212]">{notice}</p>
      )}

      <p className="text-center text-[14px] font-medium leading-[1.5] text-[#737478]">
        {description}
      </p>

      {action}
    </div>
  );
}
