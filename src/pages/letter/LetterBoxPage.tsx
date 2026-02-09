import { useMemo, useState, useEffect } from 'react';
import { MOCK_LETTERS } from '@/mocks/mockLetter';
import FolderList from '@/components/letterBox/letterFolder/FolderList';
import FolderSettingSheet from '@/components/letterBox/letterFolder/FolderSettingSheet';
import ConfirmModal from '@/components/common/ConfirmModal';
import FolderModal from '@/components/letterBox/letterFolder/FolderModal';
import type { Folder } from '@/types/folder';
import type { Letter } from '@/types/letter';
import ToolBar from '@/components/letterBox/ToolBar';
import LetterCard from '@/components/letterBox/letterCard/LetterCard';
import { useNavigate } from 'react-router-dom';
import {
  getFolderList,
  deleteFolder,
  createFolder,
  updateFolder,
  updateFolderOrders,
} from '@/api/folder';
import { uploadImage } from '@/api/image';
import { refreshAccessToken } from '@/api/http';

type FolderSelectId = 'all' | 'like' | number;
type ViewMode = '기본 보기' | '간편 보기';

export default function LetterBox() {
  const [selectedFolderId, setSelectedFolderId] = useState<FolderSelectId>('all');
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>('기본 보기');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [settingFolderId, setSettingFolderId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [deleteTargetFolderId, setDeleteTargetFolderId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    setLetters(MOCK_LETTERS);
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        await refreshAccessToken();
      } catch {
        return;
      }

      const data = await getFolderList();
      setFolders([...data].sort((a, b) => a.folderOrder - b.folderOrder));
    };
    void run();
  }, []);

  const editingFolder = useMemo(() => {
    if (editingFolderId == null) return null;
    return folders.find((f) => f.id === editingFolderId) ?? null;
  }, [folders, editingFolderId]);

  const handleConfirmUpsertFolder = async (data: {
    folder_name: string;
    imageId: number | null;
  }) => {
    if (editingFolderId == null) {
      await createFolder(data.folder_name, data.imageId);
    } else {
      await updateFolder(editingFolderId, {
        name: data.folder_name,
        imageId: data.imageId ?? null,
      });
    }

    const next = await getFolderList();
    setFolders([...next].sort((a, b) => a.folderOrder - b.folderOrder));

    setIsModalOpen(false);
    setEditingFolderId(null);
  };

  const persistOrder = async (next: Folder[]) => {
    await updateFolderOrders(next.map((f) => f.id));
  };

  return (
    <>
      <FolderList
        folders={folders}
        selectedId={selectedFolderId}
        onSelect={(id) => {
          setSelectedFolderId(id);
          setSelectedFromId('all');
        }}
        onFolderAdd={() => {
          setEditingFolderId(null);
          setIsModalOpen(true);
        }}
        onOpenFolderSetting={(id) => {
          setSettingFolderId(id);
          setIsSettingOpen(true);
        }}
        onReorder={(next) => {
          setFolders(next);
          void persistOrder(next);
        }}
      />

      {isModalOpen && (
        <FolderModal
          title={editingFolderId == null ? '새 폴더 만들기' : '폴더 수정'}
          initialName={editingFolder?.name ?? ''}
          initialImageUrl={editingFolder?.imageUrl ?? null}
          initialImageId={editingFolder?.imageId ?? null}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingFolderId(null);
          }}
          onConfirm={handleConfirmUpsertFolder}
          uploadImage={uploadImage}
        />
      )}

      <FolderSettingSheet
        open={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
        onSelect={(type) => {
          if (settingFolderId == null) return;

          if (type === 'editFolder') {
            setIsSettingOpen(false);
            setEditingFolderId(settingFolderId);
            setIsModalOpen(true);
          } else {
            setDeleteTargetFolderId(settingFolderId);
            setIsSettingOpen(false);
            setIsDeleteModalOpen(true);
          }
        }}
      />

      <ConfirmModal
        open={isDeleteModalOpen}
        title="폴더 삭제"
        titleClassName="text-[#FF1D0D]"
        description="폴더를 삭제할까요? 편지는 삭제되지 않아요"
        onCancel={() => {
          if (isDeleting) return;
          setIsDeleteModalOpen(false);
        }}
        onConfirm={async () => {
          if (deleteTargetFolderId == null || isDeleting) return;

          setIsDeleting(true);
          try {
            await deleteFolder(deleteTargetFolderId);

            const next = await getFolderList();
            setFolders([...next].sort((a, b) => a.folderOrder - b.folderOrder));

            if (selectedFolderId === deleteTargetFolderId) {
              setSelectedFolderId('all');
              setSelectedFromId('all');
            }

            setIsDeleteModalOpen(false);
            setDeleteTargetFolderId(null);
          } finally {
            setIsDeleting(false);
          }
        }}
      />

      <div className="flex flex-col gap-[10px] mb-3">
        <ToolBar
          totalCount={letters.length}
          folderTotalCount={letters.length}
          froms={[]}
          fromCounts={{}}
          selectedFromId={selectedFromId}
          onFromSelect={setSelectedFromId}
          view={viewMode}
          onViewChange={setViewMode}
        />

        {letters.map((letter) => (
          <div
            key={letter.id}
            role="button"
            className="cursor-pointer"
            onClick={() => navigate(`/letter/${letter.id}`)}
          >
            <LetterCard {...letter} viewMode={viewMode} />
          </div>
        ))}
      </div>
    </>
  );
}
