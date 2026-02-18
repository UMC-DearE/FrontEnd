import loadingImg from '@/assets/create/loading.svg';

type LoadingSectionProps = {
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function LoadingSection({
  className,
  title = '편지를 읽고 있어요',
  subtitle = 'reading',
}: LoadingSectionProps) {
  return (
    <div
      className={`h-full flex flex-col items-center justify-center gap-[20px] mt-50 ${
        className ?? ''
      }`}
    >
      <img src={loadingImg} alt="loading" className="w-[71px] h-[65px] shake" />
      <div className="flex flex-col items-center">
        <p className="text-base text-[#555557] font-medium">{title}</p>
        <p className="text-sm font-medium text-[#9D9D9F]">{subtitle}</p>
      </div>

      <div className="w-[135px] h-[16px] bg-[#F4F5F6] rounded-[20px] overflow-hidden px-[2px] py-[2px]">
        <div className="loading-grow h-[12px] rounded-[20px]" />
      </div>
    </div>
  );
}
