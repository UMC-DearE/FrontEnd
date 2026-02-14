export type LetterListParams = {
  page: number;
  size: number;
  sort?: string;
  folderId?: number;
  fromId?: number;
  isLiked?: boolean;
};

export const letterKeys = {
  list: (params: LetterListParams) => ['letters', params] as const,
};
