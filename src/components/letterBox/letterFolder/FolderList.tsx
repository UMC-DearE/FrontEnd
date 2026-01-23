// 편지함 폴더 리스트

import likeIcon from '@/assets/letterPage/likeIcon.svg';
import plusIcon from '@/assets/letterPage/plusIcon.svg';
import type { FolderType } from '@/types/folder';
import FolderItem from './FolderItem';

type FolderSelectId = 'all' | 'like' | number;

interface FolderListProps {
  folders: FolderType[];
  selectedId: FolderSelectId;
  onSelect: (id: FolderSelectId) => void;
  onFolderAdd: () => void;
  onOpenFolderSetting: (folderId: number) => void;
}

export default function FolderList({
  folders,
  selectedId,
  onSelect,
  onFolderAdd,
  onOpenFolderSetting,
}: FolderListProps) {
  return (
    <div className="flex gap-[10px] px-4 py-5 overflow-x-auto no-scrollbar">
      <div className="flex flex-col items-center gap-2 shrink-0" onClick={() => onSelect('all')}>
        <button
          type="button"
          className={`flex items-center justify-center w-[50px] h-[50px] rounded-[10px] cursor-pointer ${
            selectedId === 'all' ? 'bg-black' : 'bg-white border-[#E6E7E9] border-[1.2px]'
          }`}
        >
          <p
            className={`text-[14px] font-semibold ${
              selectedId === 'all' ? 'text-white' : 'text-[#C2C4C7]'
            }`}
          >
            ALL
          </p>
        </button>
        <p
          className={`text-[12px] ${
            selectedId === 'all' ? 'text-black font-semibold' : 'text-[#C2C4C7]'
          }`}
        >
          전체
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 shrink-0" onClick={() => onSelect('like')}>
        <button
          type="button"
          className={`flex items-center justify-center w-[50px] h-[50px] rounded-[10px] cursor-pointer ${
            selectedId === 'like' ? 'bg-black' : 'bg-white border-[#E6E7E9] border-[1.2px]'
          }`}
        >
          <img
            src={likeIcon}
            alt="like-icon"
            className={selectedId === 'like' ? 'brightness-0 invert' : ''}
          />
        </button>
        <p
          className={`text-[12px] ${
            selectedId === 'like' ? 'text-black font-semibold' : 'text-[#C2C4C7]'
          }`}
        >
          좋아요
        </p>
      </div>

      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          selectedId={selectedId}
          onSelect={onSelect}
          onOpenFolderSetting={onOpenFolderSetting}
        />
      ))}

      <div className="flex flex-col items-center gap-2 shrink-0" onClick={onFolderAdd}>
        <button
          type="button"
          className="flex items-center justify-center w-[50px] h-[50px] bg-white border-[#E6E7E9] border-[1.2px] rounded-[10px] cursor-pointer"
        >
          <img src={plusIcon} alt="plus-icon" />
        </button>
        <p className="text-[12px] text-[#C2C4C7]">추가</p>
      </div>
    </div>
  );
}
