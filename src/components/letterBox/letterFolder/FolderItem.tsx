import { useState } from 'react';
import folderSetIcon from '@/assets/letterPage/folderSetIcon.svg';
import type { Folder } from '@/types/folder';
import DefaultFolder from './DefaultFolder';

type FolderSelectId = 'all' | 'like' | number;

interface FolderItemProps {
  folder: Folder;
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
  const [brokenUrl, setBrokenUrl] = useState<string | null>(null);

  const url = folder.imageUrl ?? null;
  const isBroken = url != null && url === brokenUrl;
  const hasFolderImage = url != null && !isBroken;

  return (
    <div className="flex flex-col items-center gap-[8px] shrink-0">
      <button
        type="button"
        onClick={() => onSelect(folder.id)}
        className={`relative flex items-center justify-center w-[54px] h-[54px] rounded-[10px] cursor-pointer ${
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
            src={url as string}
            alt={folder.name}
            className="w-full h-full rounded-[10px] object-cover"
            onError={() => setBrokenUrl(url)}
          />
        ) : (
          <DefaultFolder alt={folder.name} />
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
            className="absolute left-[42px] bottom-[41px] cursor-pointer w-[18px] h-[18px]"
          >
            <img src={folderSetIcon} alt="folder-setting-icon" className="pointer-events-none" />
          </div>
        )}
      </button>

      <p
        className={`text-[12px] transition-colors ${isSelected ? 'text-black font-semibold' : 'text-[#C2C4C7]'}`}
      >
        {folder.name}
      </p>
    </div>
  );
}
