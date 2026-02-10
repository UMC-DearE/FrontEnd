import { useEffect, useMemo, useState } from 'react';
import report from '@/assets/report/report.svg';
import goldIcon from '@/assets/report/goldIcon.svg';
import silverIcon from '@/assets/report/silverIcon.svg';
import bronzeIcon from '@/assets/report/bronzeIcon.svg';
import {
  getReports,
  type ReportEmotionDistributionItem,
  type ReportTop3FromItem,
} from '@/api/report';
import {
  top3StyleByRank,
  emotionStyleByName,
  fallbackTop3Style,
  fallbackEmotionStyle,
} from '@/constants/reportStyle';

type Top3FromUIItem = ReportTop3FromItem & { color: string; textColor: string };
type EmotionUIItem = ReportEmotionDistributionItem & { color: string; textColor: string };

export default function ReportPage() {
  const [top3From, setTop3From] = useState<ReportTop3FromItem[]>([]);
  const [topPhrases, setTopPhrases] = useState<string[]>([]);
  const [emotionDistribution, setEmotionDistribution] = useState<ReportEmotionDistributionItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setIsLoading(true);
        const res = await getReports();
        if (!alive) return;

        setTop3From(res.data.top3From ?? []);
        setTopPhrases(res.data.topPhrases ?? []);
        setEmotionDistribution(res.data.emotionDistribution ?? []);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const medalIcons = useMemo(() => [goldIcon, silverIcon, bronzeIcon], []);

  const top3FromUI: Top3FromUIItem[] = useMemo(
    () =>
      top3From
        .slice()
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 3)
        .map((item) => {
          const style = top3StyleByRank[item.rank] ?? fallbackTop3Style;
          return { ...item, ...style };
        }),
    [top3From]
  );

  const emotionDistributionUI: EmotionUIItem[] = useMemo(
    () =>
      emotionDistribution.map((item) => {
        const style = emotionStyleByName[item.emotion] ?? fallbackEmotionStyle;
        return { ...item, ...style };
      }),
    [emotionDistribution]
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 pb-1 space-y-7">
        <button className="cursor-pointer">
          <img src={report} alt="report-recap" className="w-full h-32" />
        </button>

        {/* TOP3 영역 */}
        <div className="flex flex-col gap-[20px]">
          <p className="text-[#141517] font-semibold text-[16px]">TOP3</p>

          <div className="bg-white w-full h-[144px] rounded-[12px] border-[#F4F5F6] border-[1.2px] shadow-[0_0_4px_rgba(217,217,217,0.5)] flex flex-col justify-center px-[16px]">
            <div className="flex flex-col gap-[18px]">
              {isLoading ? (
                <div className="text-[#9EA1A8] text-[14px]">불러오는 중...</div>
              ) : top3FromUI.length === 0 ? (
                <div className="text-[#9EA1A8] text-[14px]">아직 데이터가 없어요</div>
              ) : (
                top3FromUI.map((item, index) => (
                  <div
                    key={`${item.rank}-${item.name}-${index}`}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-[10px]">
                      {/* 메달 아이콘 */}
                      <img src={medalIcons[index]} alt={`${item.rank}`} className="w-6 h-6" />

                      {/* 이름 뱃지 */}
                      <div
                        className={`${item.color} ${item.textColor} px-[11px] py-1 rounded-[6px] font-medium text-[13px]`}
                      >
                        {item.name}
                      </div>
                    </div>

                    {/* 통수 */}
                    <div className="text-[#555557] font-medium text-[14px]">{item.count}통</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 가장 많이 들은 말 영역 */}
        <div className="flex flex-col gap-[18px]">
          <p className="text-[#141517] font-semibold text-[16px]">가장 많이 들은 말</p>

          {isLoading ? (
            <div className="text-[#9EA1A8] text-[14px]">불러오는 중...</div>
          ) : topPhrases.length === 0 ? (
            <div className="text-[#9EA1A8] text-[14px]">아직 데이터가 없어요</div>
          ) : (
            <div className="flex gap-[8px] flex-wrap">
              {topPhrases.map((phrase, index) => (
                <div
                  key={`${phrase}-${index}`}
                  className="px-[14px] py-[6px] border border-[#E6E7E9] rounded-[18.5px] bg-white text-[14px] font-medium text-[#555557]"
                >
                  {phrase}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 수집한 감정 태그 영역 */}
        <div className="flex flex-col gap-[18px]">
          <p className="text-[#141517] font-semibold text-[16px]">수집한 감정 태그</p>

          <div className="w-full h-[118px] bg-white rounded-[16px] border-[#F4F5F6] border-[1.2px] flex justify-around py-[16px] px-[22px]">
            {isLoading ? (
              <div className="text-[#9EA1A8] text-[14px]">불러오는 중...</div>
            ) : emotionDistributionUI.length === 0 ? (
              <div className="text-[#9EA1A8] text-[14px]">아직 데이터가 없어요</div>
            ) : (
              emotionDistributionUI.map((item, index) => (
                <div
                  key={`${item.emotion}-${index}`}
                  className="flex flex-col items-center gap-[2px]"
                >
                  <p className="text-[11px] text-[#9EA1A8]">{item.percent}%</p>

                  <div className="w-[48px] h-[72px] bg-[#F1F1F166] rounded-[10px] relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                      style={{
                        height: `${Math.max(0, Math.min(100, item.percent))}%`,
                        backgroundImage: `linear-gradient(to bottom, ${item.color} 0%, #FFFFFF 100%)`,
                      }}
                    />
                  </div>

                  <p className={`text-[8px] font-semibold ${item.textColor}`}>{item.emotion}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
