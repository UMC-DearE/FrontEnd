import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import ToolBar from '@/components/letterBox/ToolBar';
import LetterCard from '@/components/letterBox/letterCard/LetterCard';
import LetterCardSkeleton from '@/components/skeleton/LetterCardSkeleton';
import { getFromList } from '@/api/from';
import { getLetterLists } from '@/api/letter';
import { addLetterToFolder } from '@/api/folder';
import type { From } from '@/types/from';
import type { Letter } from '@/types/letter';

type LayoutContext = {
  setFixedAction: (payload: { node: React.ReactNode; bgColor?: string } | null) => void;
};

type LocationState = { folderId?: number; folderName?: string } | null;

export default function LetterSelectPage() {
  const { setFixedAction } = useOutletContext<LayoutContext>();
  const navigate = useNavigate();
  const location = useLocation();
  const folderId = (location.state as LocationState)?.folderId;

  const [froms, setFroms] = useState<From[]>([]);
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');

  const [allLetters, setAllLetters] = useState<Letter[]>([]);
  const [allCount, setAllCount] = useState(0);
  const [isLettersLoading, setIsLettersLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    let alive = true;

    const run = async () => {
      setIsLettersLoading(true);
      try {
        const res = await getLetterLists({
          page: 0,
          size: 9999,
          sort: 'receivedAt,desc',
        });

        if (!alive) return;

        const unfolderedLetters = (res.data.content ?? []).filter((l) => l.folderId == null);
        setAllLetters(unfolderedLetters);
        setAllCount(unfolderedLetters.length);
      } catch (e) {
        if (!alive) return;
        setAllLetters([]);
        setAllCount(0);
        console.error(e);
      } finally {
        if (alive) setIsLettersLoading(false);
      }
    };

    void run();

    return () => {
      alive = false;
    };
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

  const handleSubmit = async () => {
    if (folderId == null || selectedIds.size === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await Promise.all(
        Array.from(selectedIds).map((letterId) => addLetterToFolder(folderId, letterId))
      );
      navigate('/letter', { state: { selectedFolderId: folderId } });
    } catch (e) {
      console.error('addLetterToFolder failed', e);
      setIsSubmitting(false);
    }
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
    <div className="flex flex-col gap-[10px] mb-3">
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
          {selectedFromId === 'all' && (
            <button
              onClick={() => navigate('/create')}
              className="w-[125px] h-[38px] bg-white rounded-[8px] border-[#E7E8EB] border-[1.2px] text-[#585A5F] cursor-pointer"
            >
              편지 추가
            </button>
          )}
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
    </div>
  );
}
