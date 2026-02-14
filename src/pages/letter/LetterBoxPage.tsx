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
import { deleteFolder, createFolder, updateFolder, updateFolderOrders } from '@/api/folder';
import { getLetterLists } from '@/api/letter';
import LetterBoxHeader from '@/components/header/LetterBoxHeader';
import SearchButton from '@/components/common/header/SearchButton';
import SearchBar from '@/components/letterBox/SearchBar';
import type { From } from '@/types/from';
import { uploadImage as uploadImageApi } from '@/api/upload';
import { useFolderList } from '@/hooks/queries/useFolderList';
import { useFromList } from '@/hooks/queries/useFromList';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';

type FolderSelectId = 'all' | 'like' | number;
type ViewMode = '기본 보기' | '간편 보기';

type LetterListParams = {
  page: number;
  size: number;
  sort?: string;
  folderId?: number;
  fromId?: number;
  isLiked?: boolean;
};

const letterKeys = {
  list: (params: LetterListParams) => ['letters', params] as const,
  count: (params: Omit<LetterListParams, 'page' | 'size' | 'fromId'>) =>
    ['letters-count', params] as const,
};

export default function LetterBoxPage() {
  const [selectedFolderId, setSelectedFolderId] = useState<FolderSelectId>('all');
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState<ViewMode>('기본 보기');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [settingFolderId, setSettingFolderId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [deleteTargetFolderId, setDeleteTargetFolderId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(20);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  const folderId = typeof selectedFolderId === 'number' ? selectedFolderId : undefined;
  const isLiked = selectedFolderId === 'like' ? true : undefined;
  const fromId = selectedFromId === 'all' ? undefined : selectedFromId;

  const foldersQuery = useFolderList();
  const fromsQuery = useFromList();

  const lettersQuery = useQuery({
    queryKey: letterKeys.list({
      page,
      size,
      sort: 'receivedAt,desc',
      folderId,
      fromId,
      isLiked,
    }),
    queryFn: async () => {
      const res = await getLetterLists({
        page,
        size,
        sort: 'receivedAt,desc',
        folderId,
        fromId,
        isLiked,
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  const allCountQuery = useQuery({
    queryKey: letterKeys.count({
      sort: 'receivedAt,desc',
      folderId,
      isLiked,
    }),
    queryFn: async () => {
      const res = await getLetterLists({
        page: 0,
        size: 1,
        sort: 'receivedAt,desc',
        folderId,
        isLiked,
      });
      return res.data;
    },
    staleTime: 30_000,
  });

  const folders = useMemo(() => {
    const data = foldersQuery.data ?? [];
    return [...data].sort((a, b) => a.folderOrder - b.folderOrder);
  }, [foldersQuery.data]);

  const allFroms = useMemo<From[]>(() => fromsQuery.data ?? [], [fromsQuery.data]);

  const letters = useMemo<Letter[]>(
    () => lettersQuery.data?.data?.content ?? [],
    [lettersQuery.data]
  );
  const totalElements = useMemo(
    () => lettersQuery.data?.data?.totalElements ?? 0,
    [lettersQuery.data]
  );
  const allCount = useMemo(
    () => allCountQuery.data?.data?.totalElements ?? 0,
    [allCountQuery.data]
  );

  const isLettersLoading = lettersQuery.isLoading;
  const isLettersFetching = lettersQuery.isFetching;

  useEffect(() => {
    setPage(0);
  }, [selectedFolderId, selectedFromId]);

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

  const persistOrder = async (next: Folder[]) => {
    await updateFolderOrders(next.map((f) => f.id));
    await queryClient.invalidateQueries({ queryKey: ['folders'] });
  };

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

    await queryClient.invalidateQueries({ queryKey: ['folders'] });

    setIsModalOpen(false);
    setEditingFolderId(null);
  };

  const handleImageDelete = async (folderIdToDelete: number | null) => {
    if (folderIdToDelete == null) return;

    const folder = folders.find((f) => f.id === folderIdToDelete);
    if (!folder) return;

    await updateFolder(folderIdToDelete, { name: folder.name, imageId: null });
    await queryClient.invalidateQueries({ queryKey: ['folders'] });
  };

  const fromCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const l of letters) {
      const id = l.from.fromId;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    return counts;
  }, [letters]);

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

  const hasError =
    foldersQuery.isError || fromsQuery.isError || lettersQuery.isError || allCountQuery.isError;

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

          {hasError ? (
            <div className="absolute left-1/2 top-[380px] -translate-x-1/2 text-[#9D9D9F] text-[15px]">
              불러오기에 실패했어요.
            </div>
          ) : isLettersLoading ? (
            <div className="absolute left-1/2 top-[380px] -translate-x-1/2 text-[#9D9D9F] text-[15px]">
              불러오는 중...
            </div>
          ) : filteredLetters.length === 0 ? (
            <div className="absolute left-1/2 top-[380px] -translate-x-1/2 text-[#9D9D9F] text-[15px]">
              {emptyMessage}
            </div>
          ) : (
            <>
              {isLettersFetching && (
                <div className="absolute left-1/2 top-[360px] -translate-x-1/2 text-[#9D9D9F] text-[12px]">
                  업데이트 중...
                </div>
              )}

              {filteredLetters.map((letter) => (
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
              ))}
            </>
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

            await queryClient.invalidateQueries({ queryKey: ['folders'] });
            await queryClient.invalidateQueries({ queryKey: ['letters'] });
            await queryClient.invalidateQueries({ queryKey: ['letters-count'] });

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
