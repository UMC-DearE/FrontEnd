// 편지함 페이지 헤더

import { useState } from 'react';
import TopSection from './TopSection';
import type { JSX } from 'react';
import SearchButton from '@/components/common/header/SearchButton';
import SearchBar from '@/components/letterBox/SearchBar';

export default function LetterBoxHeader({ title }: { title?: string }): JSX.Element {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative">
      <TopSection
        left={
          isSearchOpen ? null : (
            <h1 className="flex items-center text-xl font-semibold leading-none text-primary">
              {title}
            </h1>
          )
        }
        right={
          isSearchOpen ? null : (
            <div onClick={() => setIsSearchOpen(true)}>
              <SearchButton />
            </div>
          )
        }
      />

      {isSearchOpen && (
        <div className="absolute left-1/2 top-15 -translate-x-1/2">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
    </div>
  );
}
