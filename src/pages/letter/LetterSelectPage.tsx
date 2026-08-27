// 폴더 편지 추가 페이지
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import ToolBar from '@/components/letterBox/ToolBar';
import LetterCard from '@/components/letterBox/letterCard/LetterCard';
import LetterCardSkeleton from '@/components/skeleton/LetterCardSkeleton';
import { getFromList } from '@/api/from';
import {
  getErrorCode,
  FOLDER_FORBIDDEN,
  FOLDER_NOT_FOUND,
  LETTER_FORBIDDEN,
  LETTER_NOT_FOUND,
} from '@/api/errorCode';
import useToast from '@/hooks/useToast';
import { useAvailableLetters } from '@/hooks/queries/useAvailableLetters';
import { useAddLettersToFolder } from '@/hooks/mutations/useAddLettersToFolder';
import type { From } from '@/types/from';

type LayoutContext = {
  setFixedAction: (payload: { node: React.ReactNode; bgColor?: string } | null) => void;
};

type LocationState = { folderId?: number; folderName?: string } | null;

export default function LetterSelectPage() {
  const { setFixedAction } = useOutletContext<LayoutContext>();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const folderId = (location.state as LocationState)?.folderId;

  const [froms, setFroms] = useState<From[]>([]);
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const {
    data,
    isLoading: isLettersLoading,
    refetch,
  } = useAvailableLetters({
    page: 0,
    size: 9999,
    sort: 'receivedAt,desc',
  });

  const addLettersMutation = useAddLettersToFolder(folderId);
  const isSubmitting = addLettersMutation.isPending;

  const allLetters = useMemo(() => data?.content ?? [], [data]);
  const allCount = data?.totalElements ?? 0;

  const toggleSelected = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getFromList();
        setFroms(data);
      } catch (e) {
        console.error('getFromList failed', e);
        setFroms([]);
      }
    };

    void run();
  }, []);

  const fromCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const l of allLetters) {
      const id = l.from.fromId;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    return counts;
  }, [allLetters]);

  const filteredLetters = useMemo(() => {
    if (selectedFromId === 'all') return allLetters;
    return allLetters.filter((l) => l.from.fromId === selectedFromId);
  }, [allLetters, selectedFromId]);

  const handleSubmit = () => {
    if (folderId == null || selectedIds.size === 0 || isSubmitting) return;

    addLettersMutation.mutate(Array.from(selectedIds), {
      onSuccess: () => {
        navigate('/letter', { state: { selectedFolderId: folderId } });
      },
      onError: (e) => {
        const code = getErrorCode(e);

        if (code === FOLDER_FORBIDDEN || code === FOLDER_NOT_FOUND) {
          toast.show('폴더를 찾을 수 없어요.');
          navigate('/letter');
          return;
        }

        if (code === LETTER_FORBIDDEN || code === LETTER_NOT_FOUND) {
          toast.show('편지 목록이 변경되었어요. 다시 선택해 주세요.');
          setSelectedIds(new Set());
          void refetch();
          return;
        }

        toast.show('폴더에 추가하지 못했어요.');
      },
    });
  };

  useEffect(() => {
    if (!setFixedAction) return;

    const hasNoLetters = allLetters.length === 0;

    setFixedAction({
      node: (
        <button
          type="button"
          disabled={selectedIds.size === 0 || isSubmitting || folderId == null}
          onClick={handleSubmit}
          className="flex justify-center items-center w-full h-[50px] bg-[#FF5F2F] text-white rounded-xl font-bold text-[16px] disabled:bg-[#E7E8EB] disabled:cursor-not-allowed"
        >
          {hasNoLetters ? '추가하기' : `추가하기 (${selectedIds.size})`}
        </button>
      ),
    });

    return () => setFixedAction(null);
  }, [setFixedAction, selectedIds, isSubmitting, folderId, allLetters.length]);

  return (
    <div className="flex flex-1 flex-col gap-[10px] mb-3">
      {!isLettersLoading && allLetters.length === 0 ? (
        // 추가할 편지가 아예 없는 경우 툴바 숨김 처리
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center text-[#A1A4AA] text-[15px]">
          추가할 편지가 없어요
          <button
            onClick={() => navigate('/create')}
            className="w-[125px] h-[38px] bg-white rounded-[8px] border-[#E7E8EB] border-[1.2px] text-[#585A5F] cursor-pointer"
          >
            편지 추가
          </button>
        </div>
      ) : (
        <>
          <ToolBar
            folderTotalCount={filteredLetters.length}
            allCount={allCount}
            froms={froms}
            fromCounts={fromCounts}
            selectedFromId={selectedFromId}
            onFromSelect={setSelectedFromId}
            hideViewToggle
          />

          {isLettersLoading ? (
            <div className="flex flex-col gap-[10px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <LetterCardSkeleton key={i} viewMode="기본 보기" />
              ))}
            </div>
          ) : filteredLetters.length === 0 ? (
            <div className="flex flex-col py-[147px] text-center text-[#A1A4AA] text-[15px] justify-center items-center gap-4">
              추가할 편지가 없어요
            </div>
          ) : (
            filteredLetters.map((letter) => (
              <div key={letter.id}>
                <LetterCard
                  letterId={letter.id}
                  viewMode="기본 보기"
                  excerpt={letter.excerpt}
                  isLiked={letter.isLiked}
                  receivedAt={letter.receivedAt}
                  from={letter.from}
                  mode="select"
                  selected={selectedIds.has(letter.id)}
                  onSelectToggle={() => toggleSelected(letter.id)}
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
