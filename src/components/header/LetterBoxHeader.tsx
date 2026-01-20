// 편지함 페이지 헤더

import TopSection from './TopSection';
import type { JSX } from 'react';
import SearchButton from '@/components/common/header/SearchButton';

export default function LetterBoxHeader({ title }: { title?: string }): JSX.Element {
  return (
    <TopSection
      left={
        <div className="flex items-center text-xl font-semibold leading-none text-primary">
          {title}
        </div>
      }
      right={<SearchButton />}
    />
  );
}
