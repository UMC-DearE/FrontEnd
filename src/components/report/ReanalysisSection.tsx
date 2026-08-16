import type { ReportAnalysis } from '@/types/report';
import ReanalyzeButton from './ReanalyzeButton';

interface ReanalysisSectionProps {
  analysis: ReportAnalysis | null;
  totalLetterCount: number;
  isPending?: boolean;
  onReanalyze: () => void;
}

export default function ReanalysisSection({
  analysis,
  totalLetterCount,
  isPending = false,
  onReanalyze,
}: ReanalysisSectionProps) {
  const requiredLetterCount = 3;

  const remainingCount = analysis
    ? Math.max(analysis.requiredLetterCount - analysis.newLetterCount, 0)
    : Math.max(requiredLetterCount - totalLetterCount, 0);

  const getGuideMessage = () => {
    // 최초 분석 전
    if (!analysis) {
      return `새 편지 ${remainingCount}통이 필요해요`;
    }

    // 최초 분석 이후, 새 편지 부족
    if (remainingCount > 0) {
      return `새 편지 ${remainingCount}통이 필요해요`;
    }

    // 편지는 충분하지만 이번 주 분석 횟수 사용함
    if (!analysis.canReanalyze) {
      return '매주 월요일 분석이 초기화 돼요';
    }

    // 재분석 가능
    return null;
  };

  const guideMessage = getGuideMessage();

  const canReanalyze = analysis?.canReanalyze ?? false;

  return (
    <div className="relative flex items-center justify-end">
      {guideMessage && (
        <p className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-medium text-[#F02E2E]">
          {guideMessage}
        </p>
      )}

      <ReanalyzeButton disabled={!canReanalyze} isPending={isPending} onClick={onReanalyze} />
    </div>
  );
}
