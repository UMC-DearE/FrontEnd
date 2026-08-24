export default function ReportAnalysisSkeleton() {
  return (
    <div className="flex w-full flex-col pb-6">
      <section className="flex flex-col">
        <div className="h-4 w-[60px] animate-pulse rounded bg-[#E7E8EB]" />

        <div className="mt-2 rounded-[10px] bg-white px-5 py-5">
          <div className="h-4 w-[150px] animate-pulse rounded bg-[#E7E8EB]" />
          <div className="mt-2 h-4 w-[180px] animate-pulse rounded bg-[#E7E8EB]" />
        </div>

        <div className="mt-2 rounded-[10px] bg-white px-5 py-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-b border-[#EBEDF0] py-3 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-4 w-3 animate-pulse rounded bg-[#E7E8EB]" />
                <div className="h-8 w-[70px] animate-pulse rounded-[6px] bg-[#E7E8EB]" />
              </div>

              <div className="h-4 w-8 animate-pulse rounded bg-[#E7E8EB]" />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col">
        <div className="mt-6 h-4 w-[70px] animate-pulse rounded bg-[#E7E8EB]" />

        <div className="mt-2 rounded-[10px] bg-white px-5 py-5">
          <div className="rounded-[10px] bg-[#F7F8F9] px-4 pb-5 pt-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-[90px] animate-pulse rounded bg-[#E7E8EB]" />
              <div className="h-8 w-8 animate-pulse rounded-full bg-[#E7E8EB]" />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <div className="h-3 w-full animate-pulse rounded bg-[#E7E8EB]" />
              <div className="h-3 w-[92%] animate-pulse rounded bg-[#E7E8EB]" />
              <div className="h-3 w-[70%] animate-pulse rounded bg-[#E7E8EB]" />
            </div>

            <div className="mt-5 flex gap-2">
              <div className="h-7 w-[90px] animate-pulse rounded-[6px] bg-[#E7E8EB]" />
              <div className="h-7 w-[90px] animate-pulse rounded-[6px] bg-[#E7E8EB]" />
            </div>
          </div>

          <p className="mt-4 text-center text-[12px] font-medium text-[#A1A4AA]">
            나의 캐릭터를 분석하고 있어요
          </p>
        </div>
      </section>
    </div>
  );
}
