import folderSetIcon from '@/assets/letterPage/folderSetIcon.svg';
import defaultFolderImage from '@/assets/letterPage/default-folder.svg';
import type { FolderType } from '@/types/folder';

type FolderSelectId = 'all' | 'like' | number;

interface FolderItemProps {
  folder: FolderType;
  selectedId: FolderSelectId;
  onSelect: (id: FolderSelectId) => void;
  onOpenFolderSetting: (folderId: number) => void;
}

export default function FolderItem({
  folder,
  selectedId,
  onSelect,
  onOpenFolderSetting,
}: FolderItemProps) {
  const isSelected = selectedId === folder.id;
  const hasFolderImage = Boolean(folder.imageUrl);

  return (
    <div className="flex flex-col items-center gap-[8px] shrink-0">
      <button
        type="button"
        onClick={() => onSelect(folder.id)}
        className={`relative flex items-center justify-center w-[50px] h-[50px] rounded-[10px] cursor-pointer ${
          hasFolderImage
            ? isSelected
              ? 'shadow-[0px_3px_4px_0px_rgba(0,0,0,0.15)]'
              : 'bg-white border-[#E6E7E9] border-[1.2px]'
            : isSelected
              ? 'bg-black shadow-[0px_3px_4px_0px_rgba(0,0,0,0.15)]'
              : 'bg-white border-[#E6E7E9] border-[1.2px]'
        }`}
      >
        {hasFolderImage ? (
          <img
            src={folder.imageUrl as string}
            alt={folder.folderName}
            className="w-full h-full rounded-[10px] object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultFolderImage;
            }}
          />
        ) : (
          <img
            src={defaultFolderImage}
            alt={folder.folderName}
            className="w-[20px] h-[17px]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultFolderImage;
            }}
          />
        )}

        {isSelected && (
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onOpenFolderSetting(folder.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onOpenFolderSetting(folder.id);
              }
            }}
            className="absolute w-[14px] h-[14px] rounded-[40px] left-[40px] bottom-[39px] bg-[#555557] flex items-center justify-center cursor-pointer"
          >
            <img
              src={folderSetIcon}
              alt="folder-setting-icon"
              className="w-2 h-2 pointer-events-none"
            />
          </div>
        )}
      </button>

      <p
        className={`text-[12px] transition-colors ${isSelected ? 'text-black font-semibold' : 'text-[#C2C4C7]'}`}
      >
        {folder.folderName}
      </p>
    </div>
  );
}
