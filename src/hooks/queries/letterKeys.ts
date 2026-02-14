export type LetterListParams = {
  page: number;
  size: number;
  sort: string;
  folderId?: number;
  fromId?: number;
  isLiked?: boolean;
};

export const folderKeys = {
  all: ['folders'] as const,
};

export const fromKeys = {
  all: ['froms'] as const,
};

export const letterKeys = {
  list: (params: LetterListParams) => ['letters', params] as const,
};
