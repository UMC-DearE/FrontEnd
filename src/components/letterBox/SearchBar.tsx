// 검색창

import { useState } from 'react';

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');

  return (
    <div className="relative flex h-[50px] w-[361px] bg-white items-center rounded-xl border-[1.2px] border-[#C2C4C7] shadow-[0px_0px_12px_0px_#0000001A] focus-within:border-black">
      <p
        className={`pointer-events-none absolute left-[22px] top-1/2 -translate-y-1/2 text-[16px] font-medium text-[#C2C4C7] transition-opacity ${
          query ? 'opacity-0' : 'opacity-100'
        }`}
      >
        편지 내용 검색
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        className="h-full w-full bg-transparent pl-[22px] pr-13 text-[16px] font-medium text-black outline-none caret-transparent"
      />

      <button
        type="button"
        onClick={() => {
          setQuery('');
          onClose();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#BEBEBE] cursor-pointer"
      >
        취소
      </button>
    </div>
  );
}
