import { useMemo, useState, useEffect } from 'react';
import FolderList from '@/components/letterBox/letterFolder/FolderList';
import FolderSettingSheet from '@/components/letterBox/letterFolder/FolderSettingSheet';
import ConfirmModal from '@/components/common/ConfirmModal';
import FolderModal from '@/components/letterBox/letterFolder/FolderModal';
import type { Folder } from '@/types/folder';
import type { Letter, LetterFrom } from '@/types/letter';
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
import { getLetterLists } from '@/api/letter';

type FolderSelectId = 'all' | 'like' | number;
type ViewMode = '기본 보기' | '간편 보기';

type LetterBoxProps = {
  keyword: string;
};

export default function LetterBox({ keyword }: LetterBoxProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<FolderSelectId>('all');
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
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
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [isLettersLoading, setIsLettersLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword.trim()), 300);
    return () => clearTimeout(t);
  }, [keyword]);

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

  useEffect(() => {
    setPage(0);
  }, [selectedFolderId, selectedFromId, debouncedKeyword]);

  useEffect(() => {
    const run = async () => {
      try {
        await refreshAccessToken();
      } catch {
        return;
      }

      const folderId = typeof selectedFolderId === 'number' ? selectedFolderId : undefined;
      const isLiked = selectedFolderId === 'like' ? true : undefined;
      const fromId = selectedFromId === 'all' ? undefined : selectedFromId;
      const keywordParam = debouncedKeyword.length > 0 ? debouncedKeyword : undefined;

      setIsLettersLoading(true);
      try {
        const res = await getLetterLists({
          page,
          size,
          sort: 'receivedAt,desc',
          folderId,
          fromId,
          isLiked,
          keyword: keywordParam,
        });

        setLetters(res.data.content ?? []);
        setTotalElements(res.data.totalElements ?? 0);
      } finally {
        setIsLettersLoading(false);
      }
    };

    void run();
  }, [selectedFolderId, selectedFromId, debouncedKeyword, page, size]);

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

  const handleImageDelete = async (folderId: number | null) => {
    if (folderId == null) return;

    try {
      const folder = folders.find((f) => f.id === folderId);
      if (!folder) return;

      await updateFolder(folderId, {
        name: folder.name,
        imageId: null,
      });

      const next = await getFolderList();
      setFolders([...next].sort((a, b) => a.folderOrder - b.folderOrder));
    } catch (err) {
      console.error('이미지 삭제 실패:', err);
    }
  };

  const persistOrder = async (next: Folder[]) => {
    await updateFolderOrders(next.map((f) => f.id));
  };

  const froms = useMemo(() => {
    const map = new Map<number, LetterFrom>();
    for (const l of letters) map.set(l.from.fromId, l.from);
    return Array.from(map.values());
  }, [letters]);

  const fromCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const l of letters) {
      const id = l.from.fromId;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    return counts;
  }, [letters]);

  const folderTotalCount = useMemo(() => {
    if (selectedFolderId === 'all') return totalElements;
    if (selectedFolderId === 'like') return totalElements;
    return totalElements;
  }, [selectedFolderId, totalElements]);

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
          onImageDelete={() => handleImageDelete(editingFolderId)}
          currentFolderId={editingFolderId}
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
          totalCount={totalElements}
          folderTotalCount={folderTotalCount}
          froms={froms}
          fromCounts={fromCounts}
          selectedFromId={selectedFromId}
          onFromSelect={setSelectedFromId}
          view={viewMode}
          onViewChange={setViewMode}
        />

        {isLettersLoading ? (
          <div className="absolute left-1/2 top-[380px] -translate-x-1/2 text-[#9D9D9F] text-[15px]">
            불러오는 중...
          </div>
        ) : letters.length === 0 ? (
          <div className="absolute left-1/2 top-[380px] -translate-x-1/2 text-[#9D9D9F] text-[15px]">
            추가된 편지가 없어요.
          </div>
        ) : (
          letters.map((letter) => (
            <div
              key={letter.id}
              role="button"
              className="cursor-pointer"
              onClick={() => navigate(`/letter/${letter.id}`)}
            >
              <LetterCard
                viewMode={viewMode}
                excerpt={letter.excerpt}
                isLiked={letter.isLiked}
                receivedAt={letter.receivedAt}
                from={letter.from}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
