// 리포트 페이지

import report from '@/assets/report/report.svg';
import goldIcon from '@/assets/report/goldIcon.svg';
import silverIcon from '@/assets/report/silverIcon.svg';
import bronzeIcon from '@/assets/report/bronzeIcon.svg';

export default function ReportPage() {
  const top3From = [
    { rank: 1, name: '민서', count: 5, color: 'bg-[#FFF9C4]', textColor: 'text-[#7B6305]' },
    { rank: 2, name: '엄마', count: 3, color: 'bg-[#FFE0E0]', textColor: 'text-[#912020]' },
    { rank: 3, name: '디어리', count: 1, color: 'bg-[#E8F5E9]', textColor: 'text-[#2E7D32]' },
  ];

  const topPhrases = ['보고싶어', '힘내', '고마워', '사랑해'];

  const emotionDistribution = [
    { emotion: '고마움', percent: 40, color: '#FFE6D8', textColor: 'text-[#F57542]' },
    { emotion: '즐거움', percent: 20, color: '#FFF3C7', textColor: 'text-[#FFB245]' },
    { emotion: '위로', percent: 20, color: '#DDF0C8', textColor: 'text-[#62BA65]' },
    { emotion: '그리움', percent: 5, color: '#E9D6E3', textColor: 'text-[#D572B7]' },
    { emotion: '고민', percent: 10, color: '#D0D9EE', textColor: 'text-[#6B80B5]' },
  ];

  const medalIcons = [goldIcon, silverIcon, bronzeIcon];

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
              {top3From.map((item, index) => (
                <div key={index} className="flex items-center justify-between w-full">
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
              ))}
            </div>
          </div>
        </div>

        {/* 가장 많이 들은 말 영역 */}
        <div className="flex flex-col gap-[18px]">
          <p className="text-[#141517] font-semibold text-[16px]">
            가장 많이 들은 말
          </p>
          <div className="flex gap-[8px]">
            {topPhrases.map((phrase, index) => (
              <div
                key={index}
                className="px-[14px] py-[6px] border border-[#E6E7E9] rounded-[18.5px] bg-white text-[14px] font-medium text-[#555557]"
              >
                {phrase}
              </div>
            ))}
          </div>
        </div>

        {/* 수집한 감정 태그 영역 */}
        <div className="flex flex-col gap-[18px]">
          <p className="text-[#141517] font-semibold text-[16px]">
            수집한 감정 태그
          </p>
          <div className="w-full h-[118px] bg-white rounded-[16px] border-[#F4F5F6] border-[1.2px] flex justify-around py-[16px] px-[22px]">
            {emotionDistribution.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-[2px]">
                <p className="text-[11px] text-[#9EA1A8]">{item.percent}%</p>

                <div className="w-[48px] h-[72px] bg-[#F1F1F166] rounded-[10px] relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full rounded-[10px] bg-gradient-to-b to-[#FFFFFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                    style={{
                      height: `${item.percent}%`,
                      backgroundImage: `linear-gradient(to bottom, ${item.color} 0%, #FFFFFF 100%)`,
                    }}
                  />
                </div>

                <p className={`text-[8px] font-semibold ${item.textColor}`}>{item.emotion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
