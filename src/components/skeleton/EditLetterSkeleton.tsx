export default function EditLetterSkeleton() {
  return (
    <>
      {/* 헤더 스켈레톤 */}
      <div className="px-4 pt-15 pb-2 animate-pulse">
        <div className="h-[56px] flex items-center justify-between">
          <div className="h-4 w-8 rounded bg-[#E0E0E0]" />
          <div className="h-5 w-24 rounded bg-[#E0E0E0]" />
          <div className="h-5 w-10 rounded bg-[#E0E0E0]" />
        </div>
      </div>

      <div className="px-4 pb-24 space-y-6 animate-pulse">

      <div className="h-40 rounded-xl bg-[#F5F5F5]" />

      <div>
        <div className="mb-2 h-4 w-32 rounded bg-[#E0E0E0]" />
        <div className="h-11 rounded-xl bg-[#F5F5F5]" />
      </div>

      <div>
        <div className="mb-2 h-4 w-32 rounded bg-[#E0E0E0]" />
        <div className="flex gap-4">
          <div className="h-11 flex-1 rounded-xl bg-[#F5F5F5]" />
          <div className="h-5 w-16 rounded bg-[#E0E0E0] self-center" />
        </div>
      </div>

      <div>
        <div className="mb-2 h-4 w-24 rounded bg-[#E0E0E0]" />
        <div className="h-14 rounded-xl bg-[#F5F5F5]" />
      </div>

      <div>
        <div className="mb-2 h-4 w-24 rounded bg-[#E0E0E0]" />
        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-14 rounded-full bg-[#F0F0F0]" />
          <div className="h-7 w-16 rounded-full bg-[#F0F0F0]" />
          <div className="h-7 w-12 rounded-full bg-[#F0F0F0]" />
        </div>
      </div>

      <div className="h-10 w-full rounded bg-[#EDEDED] mt-30" />
    </div>
    </>
  );
}
