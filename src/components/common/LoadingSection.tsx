type LoadingSectionProps = {
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function LoadingSection({
  title = '편지를 분석 중이에요',
  subtitle = '분석에는 최대 1분 정도 소요될 수 있어요.',
}: LoadingSectionProps) {
  return (
    <div className="fixed inset-0 z-[100] flex justify-center bg-[#F7F8F9]">
      <div className="flex min-h-[100dvh] w-full max-w-[440px] items-center justify-center">
        <div className="flex -translate-y-[45px] flex-col items-center">
          <div className="h-[50px] w-[50px] animate-spin rounded-full border-[4px] border-[#E7E8EB] border-t-[#FF5F2F]" />

          <div className="mt-4 flex flex-col items-center">
            <p className="text-[18px] font-semibold text-primary">{title}</p>

            <p className="mt-3 text-[14px] font-medium text-[#737478]">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
