import type { CommonResponse } from './common';

export type ReportAnalysisStatus = 'NO_LETTER' | 'NOT_ENOUGH_LETTER' | 'AVAILABLE';

export interface ReportFromRanking {
  rank: number;
  name: string;
  count: number;
  bgColor: string;
  fontColor: string;
}

export interface ReportAnalysis {
  status: ReportAnalysisStatus;
  title: string | null;
  profileImageUrl: string | null;
  description: string | null;
  hashtags: string[];
  analyzedAt: string | null;
}

export interface ReportReanalyze {
  enabled: boolean;
  reason: string | null;
  message: string | null;
}

export interface ReportData {
  totalLetterCount: number;
  fromRanking: ReportFromRanking[];
  analysis: ReportAnalysis;
  reanalyze: ReportReanalyze;
}

export type ReportResponse = CommonResponse<ReportData>;

export interface ReanalyzeReportData {
  title: string;
  description: string;
  hashtags: string[];
  analyzedAt: string;
}

export type ReanalyzeReportResponse = CommonResponse<ReanalyzeReportData>;
