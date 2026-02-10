import type { Letter } from '@/types/letter';

export const MOCK_LETTERS: Letter[] = [
  {
    id: 15,
    excerpt: '오늘 생일 축하해줘서 정말 고마워!',
    isLiked: false,
    receivedAt: '2024-07-08',
    createdAt: '2026-01-16T12:27:03',
    from: {
      fromId: 1065,
      name: '엄마',
      bgColor: '#FEEFEF',
      fontColor: '#333333',
    },
    folderId: 1,
  },
  {
    id: 27,
    excerpt: '디어리 파이팅~!!',
    isLiked: true,
    receivedAt: '2026-01-21',
    createdAt: '2026-01-16T12:27:03',
    from: {
      fromId: 574,
      name: '나룬',
      bgColor: '#F7F7F7',
      fontColor: '#000000',
    },
    folderId: 1,
  },
  {
    id: 40,
    excerpt: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    isLiked: false,
    receivedAt: '2026-01-23',
    createdAt: '2026-01-16T12:27:03',
    from: {
      fromId: 574,
      name: '나룬',
      bgColor: '#F7F7F7',
      fontColor: '#000000',
    },
    folderId: 2,
  },
  {
    id: 41,
    excerpt: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    isLiked: false,
    receivedAt: '2026-01-23',
    createdAt: '2026-01-16T12:27:03',
    from: {
      fromId: 574,
      name: '나룬',
      bgColor: '#F7F7F7',
      fontColor: '#000000',
    },
    folderId: 2,
  },
  {
    id: 42,
    excerpt: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
    isLiked: false,
    receivedAt: '2026-01-23',
    createdAt: '2026-01-16T12:27:03',
    from: {
      fromId: 574,
      name: '나룬',
      bgColor: '#F7F7F7',
      fontColor: '#000000',
    },
    folderId: 2,
  },
];

export function getMockLetters(): Promise<Letter[]> {
  return Promise.resolve(MOCK_LETTERS);
}
