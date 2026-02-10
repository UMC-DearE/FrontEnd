import { api } from '@/api/http';

export type ReportTop3FromItem = {
  rank: number;
  name: string;
  count: number;
};

export type ReportEmotionDistributionItem = {
  emotion: string;
  percent: number;
};

export type GetReportsResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    top3From: ReportTop3FromItem[];
    topPhrases: string[];
    emotionDistribution: ReportEmotionDistributionItem[];
    dummy?: boolean;
  };
};

export const getReports = async () => {
  const res = await api.get<GetReportsResponse>('/reports');
  return res.data;
};
