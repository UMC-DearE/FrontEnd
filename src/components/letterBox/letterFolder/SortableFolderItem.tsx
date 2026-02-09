// 편지함 폴더 순서 변경

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import FolderItem from './FolderItem';
import type { Folder } from '@/types/folder';

type FolderSelectId = 'all' | 'like' | number;

type Props = {
  id: number;
  folder: Folder;
  selectedId: FolderSelectId;
  onSelect: (id: FolderSelectId) => void;
  onOpenFolderSetting: (folderId: number) => void;
};

export default function SortableFolderItem({
  id,
  folder,
  selectedId,
  onSelect,
  onOpenFolderSetting,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FolderItem
        folder={folder}
        selectedId={selectedId}
        onSelect={onSelect}
        onOpenFolderSetting={onOpenFolderSetting}
      />
    </div>
  );
}
