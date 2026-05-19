import { useQuery } from '@tanstack/react-query';
import { getRandomLetter } from '@/api/letter';
import type { RandomLetterData } from '@/types/letter';

export const randomLetterKey = ['randomLetter'];

const STORAGE_KEY = 'randomLetterCache';

function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function readRandomLetterCache(): RandomLetterData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { date: string; data: RandomLetterData };
    if (parsed.date !== getTodayKey()) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export function writeRandomLetterCache(data: RandomLetterData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), data }));
  } catch {
    // localStorage 접근 불가 시 무시
  }
}

async function fetchOrLoadRandomLetter(): Promise<RandomLetterData> {
  const cached = readRandomLetterCache();
  if (cached) return cached;
  const fresh = await getRandomLetter();
  writeRandomLetterCache(fresh);
  return fresh;
}

export function useRandomLetterQuery() {
  return useQuery<RandomLetterData>({
    queryKey: randomLetterKey,
    queryFn: fetchOrLoadRandomLetter,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
