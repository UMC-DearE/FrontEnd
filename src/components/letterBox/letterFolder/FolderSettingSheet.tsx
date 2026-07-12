// 편지함 폴더 설정 모달

interface FolderSettingSheetProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: 'editFolder' | 'deleteFolder') => void;
}

export default function FolderSettingSheet({ open, onClose, onSelect }: FolderSettingSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-[440px] min-h-screen overflow-hidden">
        <button type="button" onClick={onClose} className="absolute inset-0 bg-black/40" />

        <div className="fixed bottom-0 left-1/2 w-full max-w-[440px] -translate-x-1/2 rounded-t-[24px] bg-white pt-[16px] pb-[40px]">
          <div className="flex flex-col items-center">
            <div className="h-[5px] w-[36px] shrink-0 rounded-full bg-[#E7E8EB]" />

            <div className="mt-[36px] flex w-full flex-col items-center gap-[40px]">
              <button
                type="button"
                onClick={() => onSelect('editFolder')}
                className="cursor-pointer text-[18px] text-[#141517]"
              >
                폴더 수정
              </button>

              <button
                type="button"
                onClick={() => onSelect('deleteFolder')}
                className="cursor-pointer text-[18px] text-[#FF1D0D]"
              >
                폴더 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
