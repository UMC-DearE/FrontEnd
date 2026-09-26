import { useMemo, useState, useEffect, useRef } from 'react';
import FolderList from '@/components/letterBox/letterFolder/FolderList';
import FolderSettingSheet from '@/components/letterBox/letterFolder/FolderSettingSheet';
import ConfirmModal from '@/components/common/ConfirmModal';
import FolderModal from '@/components/letterBox/letterFolder/FolderModal';
import type { Folder, UpdateFolderRequest } from '@/types/folder';
import type { FolderModalResult } from '@/components/letterBox/letterFolder/FolderModal';
import type { Letter } from '@/types/letter';
import ToolBar from '@/components/letterBox/ToolBar';
import LetterCard from '@/components/letterBox/letterCard/LetterCard';
import { useLocation, useNavigate } from 'react-router-dom';
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
import useDebouncedValue from '@/hooks/useDebouncedValue';

type FolderSelectId = 'all' | 'like' | number;
type ViewMode = '기본 보기' | '간편 보기';

type LocationState = { selectedFolderId?: FolderSelectId } | null;

const VIEW_MODE_KEY = 'letterbox:viewMode';
const MIN_SEARCH_LENGTH = 2;
const UNPAGED_SIZE = 9999;
const EMPTY_FROM_COUNTS: Record<number, number> = {};

const isViewMode = (v: unknown): v is ViewMode => v === '기본 보기' || v === '간편 보기';

export default function LetterBoxPage() {
  const HEADER_SAFE_AREA = 'min(env(safe-area-inset-top, 0px), 32px)';
  const HEADER_HEIGHT = 78;
  const SEARCH_BAR_TOP = 34;

  const navigate = useNavigate();
  const location = useLocation();
  const initialFolderId = (location.state as LocationState)?.selectedFolderId ?? 'all';

  const [selectedFolderId, setSelectedFolderId] = useState<FolderSelectId>(initialFolderId);
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');

  useEffect(() => {
    const next = (location.state as LocationState)?.selectedFolderId;
    if (next != null) {
      setSelectedFolderId(next);
      window.history.replaceState({}, '');
    }
  }, [location.state]);

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
  const searchBarRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const isQueryTooShort = trimmedQuery.length > 0 && trimmedQuery.length < MIN_SEARCH_LENGTH;
  const debouncedQuery = useDebouncedValue(trimmedQuery);
  const keyword = debouncedQuery.length >= MIN_SEARCH_LENGTH ? debouncedQuery : undefined;

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

  useEffect(() => {
    const run = async () => {
      const folderId = typeof selectedFolderId === 'number' ? selectedFolderId : undefined;
      const isLiked = selectedFolderId === 'like' ? true : undefined;

      try {
        const res = await getLetterLists({
          page: 0,
          size: UNPAGED_SIZE,
          sort: 'receivedAt,desc',
          folderId,
          isLiked,
          keyword,
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
  }, [selectedFolderId, keyword]);

  useEffect(() => {
    setPage(0);
  }, [selectedFolderId, selectedFromId, keyword]);

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
          size: keyword ? UNPAGED_SIZE : size,
          sort: 'createdAt,desc',
          folderId,
          fromId,
          isLiked,
          keyword,
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
  }, [selectedFolderId, selectedFromId, page, size, keyword]);

  useEffect(() => {
    setQuery('');
  }, [selectedFolderId]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleOutsidePointerDown = (e: Event) => {
      if (searchBarRef.current?.contains(e.target as Node)) return;
      setQuery('');
      setIsSearchOpen(false);
    };

    document.addEventListener('mousedown', handleOutsidePointerDown);
    document.addEventListener('touchstart', handleOutsidePointerDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsidePointerDown);
      document.removeEventListener('touchstart', handleOutsidePointerDown);
    };
  }, [isSearchOpen]);

  const editingFolder = useMemo(() => {
    if (editingFolderId == null) return null;
    return folders.find((f) => f.id === editingFolderId) ?? null;
  }, [folders, editingFolderId]);

  const handleConfirmUpsertFolder = async (data: FolderModalResult) => {
    if (editingFolderId == null) {
      await createFolder(data.folder_name, data.imageId);
    } else {
      const body: UpdateFolderRequest = { name: data.folder_name };

      if (data.imageAction === 'CHANGE' && data.imageId != null) {
        body.imageAction = 'CHANGE';
        body.imageId = data.imageId;
      } else if (data.imageAction === 'DELETE') {
        body.imageAction = 'DELETE';
      }

      await updateFolder(editingFolderId, body);
    }

    const next = await getFolderList();
    setFolders([...next].sort((a, b) => a.folderOrder - b.folderOrder));

    setIsModalOpen(false);
    setEditingFolderId(null);
  };

  const persistOrder = async (next: Folder[]) => {
    await updateFolderOrders(next.map((f) => f.id));
  };

  const fromCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const l of allLetters) {
      const id = l.from.fromId;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    return counts;
  }, [allLetters]);

  const isDefaultFolder = selectedFolderId === 'all' || selectedFolderId === 'like';

  const selectedFolderName = useMemo(() => {
    if (typeof selectedFolderId !== 'number') return '';
    return folders.find((f) => f.id === selectedFolderId)?.name ?? '';
  }, [folders, selectedFolderId]);

  const handleLikeToggle = (letterId: number, nextLiked: boolean) => {
    setAllLetters((prev) =>
      prev.map((l) => (l.id === letterId ? { ...l, isLiked: nextLiked } : l))
    );
    setLetters((prev) => {
      if (selectedFolderId === 'like' && !nextLiked) {
        return prev.filter((l) => l.id !== letterId);
      }
      return prev.map((l) => (l.id === letterId ? { ...l, isLiked: nextLiked } : l));
    });
    if (selectedFolderId === 'like') {
      setTotalElements((prev) => (nextLiked ? prev : Math.max(0, prev - 1)));
      setAllCount((prev) => (nextLiked ? prev : Math.max(0, prev - 1)));
    }
  };

  const emptyMessage = useMemo(() => {
    if (isQueryTooShort) return `검색어를 ${MIN_SEARCH_LENGTH}자 이상 입력해 주세요.`;
    if (keyword) return '검색 결과가 없어요.';
    if (selectedFromId !== 'all') return '필터링 결과가 없어요.';
    if (isDefaultFolder) return '추가된 편지가 없어요.';
    return '저장된 편지가 없어요.';
  }, [isQueryTooShort, keyword, selectedFromId, isDefaultFolder]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[440px]">
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
        <div
          className="fixed left-0 right-0 z-50 flex justify-center"
          style={{
            top: `calc(${HEADER_SAFE_AREA} + ${SEARCH_BAR_TOP}px)`,
          }}
        >
          <div ref={searchBarRef} className="w-full max-w-[440px] px-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              onClose={() => {
                setQuery('');
                setIsSearchOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: `calc(${HEADER_SAFE_AREA} + ${HEADER_HEIGHT}px)`,
        }}
      >
        <FolderList
          folders={folders}
          selectedId={selectedFolderId}
          onSelect={(id) => {
            if (isSearchOpen) return;
            setSelectedFolderId(id);
            setSelectedFromId('all');
          }}
          onFolderAdd={() => {
            if (isSearchOpen) return;
            setEditingFolderId(null);
            setIsModalOpen(true);
          }}
          onOpenFolderSetting={(id) => {
            if (isSearchOpen) return;
            setSettingFolderId(id);
            setIsSettingOpen(true);
          }}
          onReorder={(next) => {
            if (isSearchOpen) return;
            setFolders(next);
            void persistOrder(next);
          }}
        />

        <div className="flex flex-col gap-3 mb-3">
          <ToolBar
            folderTotalCount={isQueryTooShort ? 0 : totalElements}
            allCount={isQueryTooShort ? 0 : allCount}
            froms={allFroms}
            fromCounts={isQueryTooShort ? EMPTY_FROM_COUNTS : fromCounts}
            selectedFromId={selectedFromId}
            onFromSelect={setSelectedFromId}
            view={viewMode}
            onViewChange={setViewMode}
          />

          {isLettersLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <LetterCardSkeleton key={i} viewMode={viewMode} />
              ))}
            </div>
          ) : isQueryTooShort || letters.length === 0 ? (
            <div className="flex flex-col py-[147px] text-center text-[#A1A4AA] text-[15px] justify-center items-center gap-4">
              {emptyMessage}
              {!trimmedQuery &&
                (isDefaultFolder ? (
                  <button
                    onClick={() => navigate('/create')}
                    className="w-[125px] h-[38px] bg-white rounded-[8px] border-[#E7E8EB] border-[1.2px] text-[#585A5F] cursor-pointer"
                  >
                    편지 추가
                  </button>
                ) : (
                  selectedFromId === 'all' && (
                    <button
                      onClick={() =>
                        navigate('/letter/select', {
                          state: {
                            folderId: selectedFolderId,
                            folderName: selectedFolderName,
                          },
                        })
                      }
                      type="button"
                      className="w-[125px] h-[38px] bg-white rounded-[8px] border-[#E7E8EB] border-[1.2px] text-[#585A5F] cursor-pointer"
                    >
                      폴더에 추가
                    </button>
                  )
                ))}
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
                  letterId={letter.id}
                  viewMode={viewMode}
                  excerpt={letter.excerpt}
                  isLiked={letter.isLiked}
                  receivedAt={letter.receivedAt}
                  from={letter.from}
                  searchQuery={keyword}
                  onLikeToggle={(next) => handleLikeToggle(letter.id, next)}
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
