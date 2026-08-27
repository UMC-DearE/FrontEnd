import type { AvailableLettersParams } from '@/types/folder';

export const folderKeys = {
  all: ['folders'] as const,
  available: (params: AvailableLettersParams) =>
    ['folders', 'letters', 'unassigned', params] as const,
};
