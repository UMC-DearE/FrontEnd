export default function ReportSkeleton() {
  return (
    <div className="flex flex-col space-y-7">
      <div className="w-full h-32 rounded-xl bg-[#F4F5F6] animate-pulse" />

      <div className="flex flex-col gap-[20px]">
        <div className="h-5 w-20 rounded-md bg-[#F4F5F6] animate-pulse" />
        <div className="bg-white w-full h-[144px] rounded-[12px] border-[#F4F5F6] border-[1.2px] shadow-[0_0_4px_rgba(217,217,217,0.5)] flex flex-col justify-center px-[16px]">
          <div className="flex flex-col gap-[14px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[10px]">
                  <div className="w-6 h-6 rounded-full bg-[#F4F5F6] animate-pulse" />
                  <div className="w-16 h-6 rounded-[6px] bg-[#F4F5F6] animate-pulse" />
                </div>
                <div className="w-10 h-4 rounded-md bg-[#F4F5F6] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[18px]">
        <div className="h-5 w-32 rounded-md bg-[#F4F5F6] animate-pulse" />
        <div className="flex gap-[8px] flex-wrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-24 h-8 rounded-[18.5px] bg-[#F4F5F6] animate-pulse"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[18px]">
        <div className="h-5 w-28 rounded-md bg-[#F4F5F6] animate-pulse" />
        <div className="w-full h-[118px] bg-white rounded-[16px] border-[#F4F5F6] border-[1.2px] flex justify-around py-[16px] px-[22px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-[4px]">
              <div className="w-6 h-3 rounded-md bg-[#F4F5F6] animate-pulse" />
              <div className="w-[48px] h-[72px] bg-[#F4F5F6] rounded-[10px] animate-pulse" />
              <div className="w-10 h-3 rounded-md bg-[#F4F5F6] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
