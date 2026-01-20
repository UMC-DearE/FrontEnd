interface FolderSettingSheetProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: 'editFolder' | 'deleteFolder') => void;
  onComplete?: () => void;
}

export default function FolderSettingSheet({ open, onClose, onSelect }: FolderSettingSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-[393px] min-h-screen overflow-hidden">
        <button type="button" onClick={onClose} className="absolute inset-0 bg-[#B0B0B0]" />

        <div className="fixed bottom-0 left-1/2 h-52 w-[393px] -translate-x-1/2 rounded-t-[17px] bg-white">
          <div className="flex h-full flex-col">
            <div className="flex flex-col mt-[63px] gap-10 items-center justify-center">
              <button
                type="button"
                onClick={() => onSelect('editFolder')}
                className="flex items-center justify-center cursor-pointer"
              >
                <p className="w-[67px] h-[21px] text-[18px] text-[#141517]">폴더 수정</p>
              </button>

              <button
                type="button"
                onClick={() => onSelect('deleteFolder')}
                className="flex items-center justify-center cursor-pointer"
              >
                <p className="w-[67px] h-[21px] text-[18px] text-[#FF1D0D]">폴더 삭제</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
