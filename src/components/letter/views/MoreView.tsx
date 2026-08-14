// 편지  상세 - 더보기 시트 내부 뷰

interface Props {
  onAddToFolder: () => void;
  onEdit: () => void;
  onRequestDelete: () => void;
}

export default function MoreView({ onAddToFolder, onEdit, onRequestDelete }: Props) {
  return (
    <div className="flex w-full flex-col items-center pt-[12px]">
      <button
        onClick={onAddToFolder}
        className="flex h-[60px] w-full items-center justify-center text-[16px] font-medium text-[#121212]"
      >
        폴더 이동
      </button>
      <button
        onClick={onEdit}
        className="flex h-[56px] w-full items-center justify-center text-[16px] font-medium text-[#121212]"
      >
        편지 수정
      </button>
      <button
        onClick={onRequestDelete}
        className="flex h-[60px] w-full items-center justify-center text-[16px] font-medium text-[#F02E2E]"
      >
        편지 삭제
      </button>
    </div>
  );
}
