import type { CommonResponse } from './common';
import type { From } from './from';

export interface ReportFromRanking extends Pick<From, 'fromId' | 'name' | 'bgColor' | 'fontColor'> {
  letterCount: number;
}

export interface ReportAnalysis {
  description: string;
  hashtags: string[];
  analyzedAt: string;

  // 마지막 분석 이후 새로 받은 편지 수
  newLetterCount: number;

  // 분석에 필요한 최소 편지 수
  requiredLetterCount: number;

  // 현재 재분석 버튼 활성화 여부
  canReanalyze: boolean;
}

export interface ReportData {
  nickname: string;
  profileImageUrl: string | null;
  totalLetterCount: number;
  fromRanking: ReportFromRanking[];
  analysis: ReportAnalysis | null;
}

export type ReportResponse = CommonResponse<ReportData>;

export interface ReanalyzeReportResponseData {
  description: string;
  hashtags: string[];
  analyzedAt: string;
}

export type ReanalyzeReportResponse = CommonResponse<ReanalyzeReportResponseData>;
