// 홈 커스터마이징 헤더

import TopSection from './TopSection';
import type { JSX } from 'react';

export default function CustomizingHeader({
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
        left={left ?? null}
        center={
          title ? (
            <h1 className="flex items-center text-xl font-semibold leading-none text-primary">
              {title}
            </h1>
          ) : null
        }
        right={right ?? null}
      />
    </div>
  );
}
