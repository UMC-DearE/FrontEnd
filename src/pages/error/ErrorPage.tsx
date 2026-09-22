// 에러 페이지

import { Fragment } from 'react';
import { ErrorState } from '@/components/common/ErrorState';
import { ERROR_CONTENT, type AppErrorType } from '@/constants/error';

interface ErrorPageProps {
  type: AppErrorType;
}

export default function ErrorPage({ type }: ErrorPageProps) {
  const { title, description, notice } = ERROR_CONTENT[type];

  return (
    <div className="flex min-h-[100dvh] justify-center bg-neutral-100">
      <div className="flex w-full max-w-[440px] flex-col items-center bg-[#F7F8F9] px-4 pt-[31dvh]">
        <ErrorState
          title={title}
          notice={notice}
          description={description.map((line, index) => (
            <Fragment key={line}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))}
        />
      </div>
    </div>
  );
}
