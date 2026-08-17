// 폴더 이동 / 새 폴더 만들기 뷰가 공유하는 본문 높이

import type { ReactNode } from 'react';

export default function FolderSheetBody({ children }: { children: ReactNode }) {
  return <div className="min-h-[294px] w-full">{children}</div>;
}
