import { FromBadge } from '@/components/common/FromBadge';
import type { ReportFromRanking } from '@/types/report';
import { useNavigate } from 'react-router-dom';

interface ReportStatisticsProps {
  totalLetterCount: number;
  ranking: ReportFromRanking[];
}

export default function ReportStatistics({ totalLetterCount, ranking }: ReportStatisticsProps) {
  const navigate = useNavigate();
  const hasLetters = totalLetterCount > 0;

  return (
    <section className="flex flex-col">
      <h2 className="pt-2 text-[13px] font-semibold text-[#A1A4AA]">나의 통계</h2>

      <div className="mt-2 rounded-[10px] bg-white px-5 py-5">
        <p className="text-[16px] font-semibold leading-[24px] text-black">
          지금까지 <span className="text-[#FF5F2F]">{totalLetterCount}통</span>
          의
          <br />
          다정한 마음을 받았어요!
        </p>
      </div>

      {hasLetters ? (
        ranking.length > 0 && (
          <div className="mt-2 flex flex-col rounded-[10px] bg-white px-5 py-2">
            {ranking.slice(0, 3).map((from, index) => (
              <div
                key={from.fromId}
                className={[
                  'flex items-center justify-between py-3',
                  index !== Math.min(ranking.length, 3) - 1 ? 'border-b border-[#EBEDF0]' : '',
                ].join(' ')}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      'text-[16px] font-semibold',
                      index === 0 ? 'text-[#FF5F2F]' : 'text-primary',
                    ].join(' ')}
                  >
                    {index + 1}
                  </span>

                  <FromBadge
                    name={from.name}
                    bgColor={from.bgColor}
                    fontColor={from.fontColor}
                    size="lg"
                  />
                </div>

                <span className="text-[16px] font-medium text-[#A1A4AA]">{from.letterCount}통</span>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="mt-2 flex flex-col items-center rounded-[10px] bg-white px-5 py-5">
          <p className="text-[14px] font-medium text-[#A1A4AA]">추가된 편지가 없어요</p>

          <button
            type="button"
            onClick={() => navigate('/create')}
            className="mt-[10px] rounded-[8px] border-[1.2px] border-[#E7E8EB] bg-white px-[35px] py-[11px] text-[14px] font-medium text-[#585A5F]"
          >
            편지 추가
          </button>
        </div>
      )}
    </section>
  );
}
