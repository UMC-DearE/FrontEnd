import ReportStatistics from '@/components/report/ReportStatistics';
import ReportAnalysisCard from '@/components/report/ReportAnalysisCard';
import LoadingSection from '@/components/common/LoadingSection';
import ReportSkeleton from '@/components/skeleton/ReportSkeleton';

import { useReport } from '@/hooks/queries/useReport';
import { useReanalyzeReport } from '@/hooks/mutations/useReanalyzeReport';
import { useMeQuery } from '@/hooks/queries/useMeQuery';

import ProfileDefault from '@/assets/homePage/profile-default.svg';
import useDelayedLoading from '@/hooks/useDelayedLoading';

export default function ReportPage() {
  const { data: report, isLoading: isReportLoading, isError: isReportError } = useReport();

  const { data: me, isLoading: isMeLoading } = useMeQuery();

  const reanalyzeMutation = useReanalyzeReport();

  const showAnalysisLoading = useDelayedLoading(isReportLoading, 500);

  if (isReportError) {
    return (
      <div className="flex flex-1 items-center justify-center py-10 text-[14px] text-[#A1A4AA]">
        리포트를 불러오지 못했어요.
      </div>
    );
  }

  // 재분석 버튼 클릭 - 즉시 로딩 화면
  if (reanalyzeMutation.isPending) {
    return (
      <LoadingSection
        title="편지를 분석 중이에요"
        subtitle="분석에는 최대 1분 정도 소요될 수 있어요."
      />
    );
  }

  // 최초 조회 오래 걸림(500ms 이상 걸리면) - 실제 AI 분석 중이라고 보고 로딩 화면
  if (showAnalysisLoading) {
    return (
      <LoadingSection
        title="편지를 분석 중이에요"
        subtitle="분석에는 최대 1분 정도 소요될 수 있어요."
      />
    );
  }

  // 일반적인 짧은 조회 - 스켈레톤
  if (isReportLoading || isMeLoading || !report || !me) {
    return (
      <div className="flex w-full flex-col pb-6">
        <ReportSkeleton />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col pb-6">
      <ReportStatistics
        totalLetterCount={report.totalLetterCount}
        ranking={report.fromRanking ?? []}
      />

      {report.analysis && report.reanalyze && (
        <ReportAnalysisCard
          nickname={me.nickname}
          profileImageUrl={me.profileImageUrl ?? ProfileDefault}
          analysis={report.analysis}
          reanalyze={report.reanalyze}
          isPending={reanalyzeMutation.isPending}
          onReanalyze={() => reanalyzeMutation.mutate()}
        />
      )}
    </div>
  );
}
