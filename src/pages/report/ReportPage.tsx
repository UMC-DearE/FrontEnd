import ReportStatistics from '@/components/report/ReportStatistics';
import ReportAnalysisCard from '@/components/report/ReportAnalysisCard';

import { useReport } from '@/hooks/queries/useReport';

export default function ReportPage() {
  const { data: report, isLoading, isError } = useReport();

  if (isLoading) {
    // 이 부분 스켈레톤 넣어야됨
    return (
      <div className="flex flex-1 items-center justify-center py-10 text-[14px] text-[#A1A4AA]">
        리포트를 불러오는 중...
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="flex flex-1 items-center justify-center py-10 text-[14px] text-[#A1A4AA]">
        리포트를 불러오지 못했어요.
      </div>
    );
  }

  const { nickname, profileImageUrl, totalLetterCount, fromRanking, analysis } = report;

  const handleReanalyze = () => {
    console.log('재분석 요청');
  };

  return (
    <div className="flex w-full flex-col pb-6">
      <ReportStatistics totalLetterCount={totalLetterCount} ranking={fromRanking} />

      <ReportAnalysisCard
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        totalLetterCount={totalLetterCount}
        analysis={analysis}
        isPending={isLoading}
        onReanalyze={handleReanalyze}
      />
    </div>
  );
}
