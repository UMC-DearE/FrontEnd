import { useMemo, useState, useEffect, useRef } from 'react';
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
import { getLetterLists } from '@/api/letter';
import LetterBoxHeader from '@/components/header/LetterBoxHeader';
import SearchButton from '@/components/common/header/SearchButton';
import SearchBar from '@/components/letterBox/SearchBar';
import type { From } from '@/types/from';
import { uploadImage as uploadImageApi } from '@/api/upload';
import { getFromList } from '@/api/from';
import LetterCardSkeleton from '@/components/skeleton/LetterCardSkeleton';

type FolderSelectId = 'all' | 'like' | number;
type ViewMode = '기본 보기' | '간편 보기';

const VIEW_MODE_KEY = 'letterbox:viewMode';

const isViewMode = (v: unknown): v is ViewMode => v === '기본 보기' || v === '간편 보기';

export default function LetterBoxPage() {
  const [selectedFolderId, setSelectedFolderId] = useState<FolderSelectId>('all');
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    return isViewMode(saved) ? saved : '기본 보기';
  });

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [settingFolderId, setSettingFolderId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [deleteTargetFolderId, setDeleteTargetFolderId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [allLetters, setAllLetters] = useState<Letter[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [isLettersLoading, setIsLettersLoading] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  const [allFroms, setAllFroms] = useState<From[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const folderData = await getFolderList();
        setFolders([...folderData].sort((a, b) => a.folderOrder - b.folderOrder));
      } catch (e) {
        console.error('getFolderList failed', e);
        setFolders([]);
      }

      try {
        const fromData = await getFromList();
        setAllFroms(fromData);
      } catch (e) {
        console.error('getFromList failed', e);
        setAllFroms([]);
      }
    };

    void run();
  }, []);

  // allLetters: fromId 필터 없이 폴더 기준으로만 전체 불러오기 (fromCounts 계산용)
  useEffect(() => {
    const run = async () => {
      const folderId = typeof selectedFolderId === 'number' ? selectedFolderId : undefined;
      const isLiked = selectedFolderId === 'like' ? true : undefined;

      try {
        const res = await getLetterLists({
          page: 0,
          size: 9999,
          sort: 'receivedAt,desc',
          folderId,
          isLiked,
        });

        setAllLetters(res.data.content ?? []);
        setAllCount(res.data.totalElements ?? 0);
      } catch (e) {
        setAllLetters([]);
        setAllCount(0);
        console.error(e);
      }
    };

    void run();
  }, [selectedFolderId]);

  useEffect(() => {
    setPage(0);
  }, [selectedFolderId, selectedFromId]);

  // letters: fromId 필터 포함해서 실제 표시용
  useEffect(() => {
    let alive = true;

    const run = async () => {
      const folderId = typeof selectedFolderId === 'number' ? selectedFolderId : undefined;
      const isLiked = selectedFolderId === 'like' ? true : undefined;
      const fromId = selectedFromId === 'all' ? undefined : selectedFromId;

      setIsLettersLoading(true);

      try {
        const res = await getLetterLists({
          page,
          size,
          sort: 'createdAt,desc',
          folderId,
          fromId,
          isLiked,
        });

        if (!alive) return;

        setLetters(res.data.content ?? []);
        setTotalElements(res.data.totalElements ?? 0);
      } finally {
        if (alive) setIsLettersLoading(false);
      }
    };

    void run();

    return () => {
      alive = false;
    };
  }, [selectedFolderId, selectedFromId, page, size]);

  useEffect(() => {
    setQuery('');
    setIsSearchOpen(false);
  }, [selectedFolderId, selectedFromId]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = searchWrapRef.current;
      if (!el) return;

      if (e.target instanceof Node && !el.contains(e.target)) {
        setIsSearchOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isSearchOpen]);

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

      await updateFolder(folderId, { name: folder.name, imageId: null });

      const next = await getFolderList();
      setFolders([...next].sort((a, b) => a.folderOrder - b.folderOrder));
    } catch (err) {
      console.error('이미지 삭제 실패:', err);
    }
  };

  const persistOrder = async (next: Folder[]) => {
    await updateFolderOrders(next.map((f) => f.id));
  };

  // allLetters 기준으로 fromCounts 계산
  const fromCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const l of allLetters) {
      const id = l.from.fromId;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    return counts;
  }, [allLetters]);

  const folderTotalCount = useMemo(() => totalElements, [totalElements]);

  const filteredLetters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return letters;

    return letters.filter((l) => {
      const excerpt = (l.excerpt ?? '').toLowerCase();
      const fromName = (l.from?.name ?? '').toLowerCase();
      return excerpt.includes(q) || fromName.includes(q);
    });
  }, [letters, query]);

  const emptyMessage = useMemo(() => {
    if (query.trim()) return '검색 결과가 없어요.';
    if (selectedFromId !== 'all') return '필터링 결과가 없어요.';
    return '추가된 편지가 없어요.';
  }, [query, selectedFromId]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[393px]">
          <LetterBoxHeader
            title="편지함"
            left={
              isSearchOpen ? null : (
                <h1 className="flex items-center text-xl font-semibold leading-none text-primary">
                  편지함
                </h1>
              )
            }
            right={isSearchOpen ? null : <SearchButton onClick={() => setIsSearchOpen(true)} />}
          />
        </div>
      </div>

      {isSearchOpen && (
        <div ref={searchWrapRef} className="fixed top-[60px] left-1/2 z-50 -translate-x-1/2">
          <SearchBar
            value={query}
            onChange={setQuery}
            onClose={() => {
              setQuery('');
              setIsSearchOpen(false);
            }}
          />
        </div>
      )}

      <div className="mt-[105px]">
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

        <div className="flex flex-col gap-[10px] mb-3">
          <ToolBar
            folderTotalCount={folderTotalCount}
            allCount={allCount}
            froms={allFroms}
            fromCounts={fromCounts}
            selectedFromId={selectedFromId}
            onFromSelect={setSelectedFromId}
            view={viewMode}
            onViewChange={setViewMode}
          />

          {isLettersLoading ? (
            <div className="flex flex-col gap-[10px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <LetterCardSkeleton key={i} viewMode={viewMode} />
              ))}
            </div>
          ) : filteredLetters.length === 0 ? (
            <div className="py-12 text-center text-[#9D9D9F] text-[15px]">{emptyMessage}</div>
          ) : (
            filteredLetters.map((letter) => (
              <div
                key={letter.id}
                role="button"
                className="cursor-pointer"
                onClick={() => navigate(`/letter/${letter.id}`)}
              >
                <LetterCard
                  letterId={letter.id}
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
      </div>

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
          uploadImage={async (file) => {
            const res = await uploadImageApi(file, 'folder');
            if (!res.success) {
              throw new Error(res.message || '이미지 업로드 실패');
            }
            return { imageId: res.data.imageId, url: res.data.url };
          }}
          onImageDelete={async () => {
            await handleImageDelete(editingFolderId);
          }}
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
    </>
  );
}
