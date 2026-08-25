import type { ReportAnalysis, ReportReanalyze } from '@/types/report';

import ReanalysisSection from './ReanalysisSection';
import ReportHashtags from './ReportHashtags';

import ProfileDefault from '@/assets/report/profile-white.svg';

interface ReportAnalysisCardProps {
  nickname: string;
  profileImageUrl: string | null;
  analysis: ReportAnalysis;
  reanalyze: ReportReanalyze;
  isPending?: boolean;
  onReanalyze: () => void;
}

export default function ReportAnalysisCard({
  analysis,
  reanalyze,
  isPending = false,
  onReanalyze,
  nickname,
  profileImageUrl,
}: ReportAnalysisCardProps) {
  const isAvailable = analysis.status === 'AVAILABLE';

  const getEmptyMessage = () => {
    if (analysis.status === 'NO_LETTER') {
      return '받은 편지가 없어 분석이 어려워요';
    }

    if (analysis.status === 'NOT_ENOUGH_LETTER') {
      return '분석하려면 편지 3통이 필요해요';
    }

    return null;
  };

  const emptyMessage = getEmptyMessage();

  return (
    <section className="flex flex-col">
      <h2 className="mt-6 text-[13px] font-semibold text-[#A1A4AA]">나의 캐릭터</h2>

      <div className="mt-2 rounded-[10px] bg-white px-5 py-5 shadow-[0_0_4px_0_rgba(231,232,235,0.5)]">
        <div className="rounded-[10px] bg-[#F7F8F9] px-4 pb-5 pt-4">
          <div className="flex items-center justify-between">
            <p className="flex items-center text-[14px] font-semibold leading-none text-black">
              TO. {nickname}
            </p>

            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border-[1.2px] border-[#E7E8EB] bg-white">
              <img
                src={profileImageUrl || ProfileDefault}
                alt="프로필"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {isAvailable ? (
            <>
              {analysis.description && (
                <p className="mt-5 break-keep text-[14px] font-medium leading-[21px] text-[#585A5F]">
                  {analysis.description}
                </p>
              )}

              <div className="mt-6">
                <ReportHashtags hashtags={analysis.hashtags} />
              </div>
            </>
          ) : (
            <p className="mt-5 text-[14px] font-medium leading-[21px] text-[#585A5F]">
              {emptyMessage}
            </p>
          )}
        </div>

        {isAvailable && (
          <div className="mt-3">
            <ReanalysisSection
              reanalyze={reanalyze}
              isPending={isPending}
              onReanalyze={onReanalyze}
            />
          </div>
        )}
      </div>
    </section>
  );
}
