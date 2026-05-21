import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRandomLetter } from '@/api/letter';
import type { RandomLetterData } from '@/types/letter';
import { useMeQuery } from '@/hooks/queries/useMeQuery';

export const randomLetterKey = ['randomLetter'];

const STORAGE_KEY_PREFIX = 'randomLetterCache_';

function getStorageKey(userId: number) {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function readRandomLetterCache(userId: number): RandomLetterData | null {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { date: string; data: RandomLetterData };
    if (parsed.date !== getTodayKey()) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function writeRandomLetterCache(userId: number, data: RandomLetterData) {
  try {
    localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify({ date: getTodayKey(), data })
    );
  } catch {
    // localStorage 접근 불가 시 무시
  }
}

async function fetchOrLoadRandomLetter(userId: number): Promise<RandomLetterData> {
  const cached = readRandomLetterCache(userId);
  if (cached) return cached;
  const fresh = await getRandomLetter();
  writeRandomLetterCache(userId, fresh);
  return fresh;
}

function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

export function useRandomLetterQuery() {
  const qc = useQueryClient();
  const { data: me } = useMeQuery();
  const userId = me?.userId;

  const query = useQuery<RandomLetterData>({
    queryKey: [...randomLetterKey, userId],
    queryFn: () => fetchOrLoadRandomLetter(userId as number),
    enabled: typeof userId === 'number',
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (typeof userId !== 'number') return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleMidnight = () => {
      timeoutId = setTimeout(() => {
        qc.invalidateQueries({ queryKey: [...randomLetterKey, userId] });
        scheduleMidnight();
      }, getMsUntilMidnight() + 1000);
    };

    scheduleMidnight();
    return () => clearTimeout(timeoutId);
  }, [qc, userId]);

  return query;
}
