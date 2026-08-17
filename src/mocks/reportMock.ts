import type { ReportData } from '@/types/report';

export const reportMock: ReportData = {
  nickname: '홍길동',
  profileImageUrl: null,
  totalLetterCount: 20,

  fromRanking: [
    {
      fromId: 1,
      name: '엄마',
      bgColor: '#FFF2F2',
      fontColor: '#FF5F5F',
      letterCount: 13,
    },
    {
      fromId: 2,
      name: '친구',
      bgColor: '#FFF8D9',
      fontColor: '#C49A00',
      letterCount: 5,
    },
    {
      fromId: 3,
      name: '누구세요',
      bgColor: '#E7F7FA',
      fontColor: '#5BAEC0',
      letterCount: 2,
    },
  ],

  analysis: {
    description:
      '당신은 주변 사람들에게 따뜻한 마음을 전하면서도 자신의 감정을 솔직하게 표현할 줄 아는 사람이에요.',
    hashtags: ['따뜻한_마음', '배려하는_사람'],
    analyzedAt: '2026-08-16T15:30:00',

    newLetterCount: 2,
    requiredLetterCount: 3,
    canReanalyze: false,
  },
};
