export type RankStyle = { color: string; textColor: string };
export type EmotionStyle = { color: string; textColor: string };

export const top3StyleByRank: Record<number, RankStyle> = {
  1: { color: 'bg-[#FFF9C4]', textColor: 'text-[#7B6305]' },
  2: { color: 'bg-[#FFE0E0]', textColor: 'text-[#912020]' },
  3: { color: 'bg-[#E8F5E9]', textColor: 'text-[#2E7D32]' },
};

export const emotionStyleByName: Record<string, EmotionStyle> = {
  고마움: { color: '#FFE6D8', textColor: 'text-[#F57542]' },
  즐거움: { color: '#FFF3C7', textColor: 'text-[#FFB245]' },
  위로: { color: '#DDF0C8', textColor: 'text-[#62BA65]' },
  그리움: { color: '#E9D6E3', textColor: 'text-[#D572B7]' },
  고민: { color: '#D0D9EE', textColor: 'text-[#6B80B5]' },
};

export const fallbackTop3Style: RankStyle = {
  color: 'bg-[#F4F5F6]',
  textColor: 'text-[#555557]',
};

export const fallbackEmotionStyle: EmotionStyle = {
  color: '#F1F1F166',
  textColor: 'text-[#555557]',
};
