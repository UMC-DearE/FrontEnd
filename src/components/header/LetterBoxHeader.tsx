// 편지함 페이지 헤더

import TopSection from './TopSection';
import type { JSX } from 'react';

export default function LetterBoxHeader({
  title,
  left,
  right,
}: {
  title?: string;
  left?: JSX.Element | null;
  right?: JSX.Element | null;
}): JSX.Element {
  return (
    <div className="relative">
      <TopSection
        left={
          left ?? (
            <h1 className="flex items-center text-xl font-semibold leading-none text-primary">
              {title}
            </h1>
          )
        }
        right={right ?? null}
      />
    </div>
  );
}
