type ViewMode = '기본 보기' | '간편 보기';

type Props = {
  viewMode: ViewMode;
};

function DefaultSkeleton() {
  return (
    <div className="w-full shadow-[0_0_4px_0_rgba(217,217,217,0.5)] rounded-lg animate-pulse">
      <div className="rounded-lg bg-white px-3 py-3 h-[121px] flex flex-col">
        <div className="flex justify-between">
          <div className="h-[12px] w-[60px] rounded bg-gray-200" />
          <div className="w-[13px] h-4 rounded bg-gray-200" />
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full">
            <div className="h-[14px] w-full rounded bg-gray-200" />
            <div className="mt-[6px] h-[14px] w-[70%] rounded bg-gray-200" />
          </div>
        </div>

        <div className="mt-1 flex justify-start">
          <div className="h-[24px] w-[45px] rounded-[6px] bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

function LetterCardCompactSkeleton() {
  return (
    <div className="w-full h-[46px] rounded-lg bg-white px-3 py-2 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-[12px] flex-1 min-w-0">
        <div className="relative h-6 w-6 flex items-center justify-center">
          <div className="absolute inset-0 m-auto w-[14px] h-[14px] rounded-full bg-gray-200" />
        </div>

        <div className="h-[14px] w-full max-w-[240px] rounded bg-gray-200" />
      </div>

      <div className="flex h-5 w-[45px] min-w-0 items-center justify-center rounded-[6px]">
        <div className="h-[12px] w-[21px] rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function LetterCardSkeleton({ viewMode }: Props) {
  if (viewMode === '간편 보기') return <LetterCardCompactSkeleton />;
  return <DefaultSkeleton />;
}
