// 편지 상세 - 폴더로 편지 이동 바텀 시트

import type { Folder } from '@/types/folder';
import BottomSheet from '@/components/common/BottomSheet';
import FolderSelectView from '@/components/letter/views/FolderSelectView';

interface Props {
  open: boolean;
  folders: Folder[];
  selectedFolderId: number | null;
  onClose: () => void;
  onSelect: (folderId: number) => void;
  onSelectNone: () => void;
  onCreateFolder: () => void;
}

export default function FolderSelect({
  open,
  folders,
  selectedFolderId,
  onClose,
  onSelect,
  onSelectNone,
  onCreateFolder,
}: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} className="px-[20px]">
      <FolderSelectView
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelect={(id) => {
          onSelect(id);
          onClose();
        }}
        onSelectNone={() => {
          onSelectNone();
          onClose();
        }}
        onCreateFolder={onCreateFolder}
      />
    </BottomSheet>
  );
}
