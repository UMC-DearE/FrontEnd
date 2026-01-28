// 편지 목록 조회 mock

import type { Letter } from '@/types/letter';

export const MOCK_LETTERS: Letter[] = [
  {
    id: 15,
    content: '오늘 생일 축하해줘서 정말 고마워!',
    isLiked: false,
    receiveAt: '2024-07-08',
    createdAt: '2026-01-16T12:27:03',
    fromId: 1065,
    fromName: '엄마',
    fromBgColor: '#FFFF00',
    fromFontColor: '#000000',
    folderId: 1,
  },
  {
    id: 27,
    content: '디어리 파이팅~!!',
    isLiked: true,
    receiveAt: '2026-01-21',
    createdAt: '2026-01-16T12:27:03',
    fromId: 574,
    fromName: '나룬',
    fromBgColor: '#F7F7F7',
    fromFontColor: '#000000',
    folderId: 1,
  },
  {
    id: 40,
    content: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    isLiked: false,
    receiveAt: '2026-01-23',
    createdAt: '2026-01-16T12:27:03',
    fromId: 574,
    fromName: '나룬',
    fromBgColor: '#F7F7F7',
    fromFontColor: '#000000',
    folderId: 2,
  },
];

export function getMockLetters(): Promise<Letter[]> {
  return Promise.resolve(MOCK_LETTERS);
}
