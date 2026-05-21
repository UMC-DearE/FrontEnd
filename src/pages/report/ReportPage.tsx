import reportIcon from '@/assets/report/reportIcon.svg';

export default function ReportPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-[12px]">
      <img src={reportIcon} alt="report-icon" className="w-[28px] h-[28px]" />
      <div className="text-[15px] font-medium text-[#A1A4AA]">기능을 준비 중이에요</div>
    </div>
  );
}
