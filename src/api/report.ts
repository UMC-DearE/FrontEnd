import { api } from '@/api/http';
import type { ReportResponse, ReanalyzeReportResponse } from '@/types/report';

export const getReport = async () => {
  const { data } = await api.get<ReportResponse>('/reports');

  return data.data;
};

export const reanalyzeReport = async () => {
  const { data } = await api.post<ReanalyzeReportResponse>('/reports/reanalysis');

  return data.data;
};
