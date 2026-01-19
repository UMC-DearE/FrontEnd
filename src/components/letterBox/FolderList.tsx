export default function FolderList() {
  return (
    <div className="flex top-[20px] gap[10px]">
      <div className="left-7">
        <button className="absolute w-[50px] h-[50px] bg-black rounded-[10px] cursor-pointer">
          <p className="text-white text-[14px]">ALL</p>
        </button>
        <p className="w-[50px] h-[14px] text-[12px] top-[78px]">전체</p>
      </div>
    </div>
  );
}
