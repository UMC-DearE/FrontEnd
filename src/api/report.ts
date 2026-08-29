import { api } from '@/api/http';

import type { ReportResponse, ReanalyzeReportResponse } from '@/types/report';

export async function getReport() {
  const { data } = await api.get<ReportResponse>('/reports');

  return data.data;
}

export async function reanalyzeReport() {
  const { data } = await api.post<ReanalyzeReportResponse>('/reports/reanalyze');

  return data.data;
}
