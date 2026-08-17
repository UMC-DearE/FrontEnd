import type { ReportAnalysis } from '@/types/report';
import ReanalysisSection from './ReanalysisSection';
import ReportHashtags from './ReportHashtags';
import ReanalyzeButton from './ReanalyzeButton';

interface ReportAnalysisCardProps {
  nickname: string;
  profileImageUrl: string | null;
  totalLetterCount: number;
  analysis: ReportAnalysis | null;
  isPending?: boolean;
  onReanalyze: () => void;
}

export default function ReportAnalysisCard({
  nickname,
  profileImageUrl,
  totalLetterCount,
  analysis,
  isPending = false,
  onReanalyze,
}: ReportAnalysisCardProps) {
  const requiredLetterCount = 3;

  const remainingCount = analysis
    ? Math.max(analysis.requiredLetterCount - analysis.newLetterCount, 0)
    : Math.max(requiredLetterCount - totalLetterCount, 0);

  return (
    <section className="flex flex-col">
      <h2 className="mt-6 text-[13px] font-semibold text-[#A1A4AA]">나의 캐릭터</h2>

      <div className="mt-2 rounded-[10px] bg-white px-5 py-5">
        <div className="rounded-[10px] bg-[#F7F8F9] px-4 pb-5 pt-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center text-[14px] font-semibold leading-none text-black">
              TO. {nickname}
            </p>

            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border-[1.2px] border-[#E7E8EB]">
              {profileImageUrl && (
                <img
                  src={profileImageUrl}
                  alt={`${nickname} 프로필`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>

          {analysis ? (
            <>
              <p className="mt-5 break-keep text-[14px] font-medium leading-[21px] text-[#585A5F]">
                {analysis.description}
              </p>

              <div className="mt-5">
                <ReportHashtags hashtags={analysis.hashtags} />
              </div>
            </>
          ) : (
            <p className="mt-5 text-[14px] font-medium leading-[21px] text-[#585A5F]">
              {totalLetterCount === 0
                ? '받은 편지가 없어 분석이 어려워요'
                : `분석하려면 편지 3통이 필요해요`}
            </p>
          )}
        </div>

        <div className="mt-3">
          {analysis ? (
            <ReanalysisSection
              analysis={analysis}
              totalLetterCount={totalLetterCount}
              isPending={isPending}
              onReanalyze={onReanalyze}
            />
          ) : (
            <div className="relative flex items-center justify-end">
              <p className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-medium text-[#F02E2E]">
                새 편지 {remainingCount}통이 필요해요
              </p>

              <ReanalyzeButton disabled onClick={() => {}} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
