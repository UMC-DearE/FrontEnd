// 편지 상세 - 폴더 이동 시트 내부 뷰
import type { Folder } from '@/types/folder';
import allFolderIcon from '@/assets/letterPage/allFolderIcon.svg';
import newFolderIcon from '@/assets/letterPage/newFolderIcon.svg';
import defaultFolderIcon from '@/assets/letterPage/default-folder.svg';
import selectFilledIcon from '@/assets/letter/select-filled.svg';
import selectOutlineIcon from '@/assets/letter/select-outline.svg';

interface Props {
  folders: Folder[];
  selectedFolderId: number | null;
  onSelect: (folderId: number) => void;
  onSelectNone: () => void;
  onCreateFolder: () => void;
}

function SelectRadio({ selected }: { selected: boolean }) {
  return (
    <img
      src={selected ? selectFilledIcon : selectOutlineIcon}
      alt=""
      className="ml-auto h-[20px] w-[20px] shrink-0"
    />
  );
}

export default function FolderSelectView({
  folders,
  selectedFolderId,
  onSelect,
  onSelectNone,
  onCreateFolder,
}: Props) {
  return (
    <div className="mt-[20px] flex max-h-[268px] w-full flex-col overflow-y-auto">
      <button
        type="button"
        onClick={onSelectNone}
        className="flex w-full items-center gap-[12px] px-[20px] py-[10px]"
      >
        <img src={allFolderIcon} alt="" className="h-[40px] w-[40px] shrink-0" />
        <span className="text-[16px] font-medium text-[#121212]">선택 없음(전체)</span>
        <SelectRadio selected={selectedFolderId == null} />
      </button>

      {folders.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onSelect(f.id)}
          className="flex w-full items-center gap-[12px] px-[20px] py-[10px]"
        >
          <img
            src={f.imageUrl || defaultFolderIcon}
            alt=""
            className="h-[40px] w-[40px] shrink-0 rounded-[8px] object-cover"
          />
          <span className="truncate text-[16px] font-medium text-[#121212]">{f.name}</span>
          <SelectRadio selected={selectedFolderId === f.id} />
        </button>
      ))}

      {folders.length < 3 && (
        <button
          type="button"
          onClick={onCreateFolder}
          className="flex w-full items-center gap-[12px] px-[20px] py-[10px]"
        >
          <img src={newFolderIcon} alt="" className="h-[40px] w-[40px] shrink-0" />
          <span className="text-[16px] font-medium text-[#121212]">새 폴더 만들기</span>
        </button>
      )}
    </div>
  );
}
