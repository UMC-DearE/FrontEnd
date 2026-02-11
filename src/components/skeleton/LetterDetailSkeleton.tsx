export default function LetterDetailSkeleton() {
  return (
        <div className="pt-1 pb-24">
      <div className="mb-6 rounded-xl border border-[#E6E7E9] bg-white p-4 shadow-[0_0_6px_rgba(0,0,0,0.05)] animate-pulse">
        <div className="mb-3 flex items-center justify-between border-b border-[#E6E7E9] pb-3">
          <div className="h-6 w-24 rounded-full bg-[#E6E7E9]" />
          <div className="h-4 w-16 rounded-full bg-[#F0F0F0]" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-11/12 rounded bg-[#F0F0F0]" />
          <div className="h-3 w-10/12 rounded bg-[#F5F5F5]" />
          <div className="h-3 w-8/12 rounded bg-[#F5F5F5]" />
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-[#F7F7F7] animate-pulse">
        <div className="mb-3 h-4 w-24 rounded bg-[#E0E0E0]" />
        <div className="h-10 w-full rounded bg-[#EDEDED]" />
      </div>

      <div className="mb-6 space-y-3 animate-pulse">
        <div className="h-4 w-20 rounded bg-[#E0E0E0]" />
        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-14 rounded-full bg-[#F0F0F0]" />
          <div className="h-7 w-16 rounded-full bg-[#F0F0F0]" />
          <div className="h-7 w-12 rounded-full bg-[#F0F0F0]" />
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-[#F7F7F7] animate-pulse">
        <div className="mb-3 h-4 w-24 rounded bg-[#E0E0E0]" />
        <div className="h-10 w-full rounded bg-[#EDEDED]" />
      </div>
      
      <div className="h-10 w-full rounded bg-[#EDEDED] mt-60" />
    </div>
  );
}
