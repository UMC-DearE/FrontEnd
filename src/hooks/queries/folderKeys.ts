import type { AvailableLettersParams } from '@/types/folder';

export const folderKeys = {
  all: ['folders'] as const,
  available: (folderId: number, params: AvailableLettersParams) =>
    ['folders', folderId, 'letters', 'available', params] as const,
};
