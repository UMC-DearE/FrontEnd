import loadingImg from "@/assets/create/loading.svg";

export default function LoadingSection() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-[20px] mb-[100px]">
      <img src={loadingImg} alt="loading" className="w-[71px] h-[65px] shake" />
      <div className="flex flex-col items-center">
      <p className="text-base text-[#555557] font-medium">편지를 읽고 있어요</p>
      <p className="text-sm font-medium text-[#9D9D9F]">reading</p></div>

      <div className="w-[135px] h-[15px] bg-[#F4F5F6] rounded-[20px] overflow-hidden">
        <div className="loading-grow h-[12px] rounded-[20px]" />
      </div>
    </div>
  );
}
