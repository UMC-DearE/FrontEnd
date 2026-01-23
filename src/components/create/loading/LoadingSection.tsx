import LoadingBar from "@/components/common/LoadingBar";

export default function SetFromPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center">
        <p className="text-base font-medium text-[#555557]">편지를 읽고 있어요</p>
        <p className="text-sm font-medium text-[#9D9D9F]">reading</p>
      </div>

      <LoadingBar />
    </div>
  );
}
