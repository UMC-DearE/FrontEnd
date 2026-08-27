import type { CommonResponse } from './common';
import type { Letter } from './letter';

export type Folder = {
  id: number;
  name: string;
  imageUrl: string | null;
  imageId: number | null;
  folderOrder: number;
};

export type FolderListResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    items: Folder[];
  };
};

export type CreateFolderRequest = {
  folder_name: string;
  imageId: number | null;
};

export type FolderImageAction = 'CHANGE' | 'DELETE';

export type UpdateFolderRequest = {
  name?: string;
  imageAction?: FolderImageAction;
  imageId?: number;
};

export type FolderLetterResponse = CommonResponse<Record<string, never>>;

export type AvailableLettersParams = {
  page?: number;
  size?: number;
  sort?: string;
  fromId?: number;
  isLiked?: boolean;
  keyword?: string;
};

export type AvailableLetter = Omit<Letter, 'folderId'>;

export type AvailableLettersResult = {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  content: AvailableLetter[];
};

export type AvailableLettersResponse = CommonResponse<AvailableLettersResult>;

export type AddLettersToFolderRequest = {
  letterIds: number[];
};

export type AddLettersToFolderResult = {
  folderId: number;
  processedCount: number;
};

export type AddLettersToFolderResponse = CommonResponse<AddLettersToFolderResult>;
