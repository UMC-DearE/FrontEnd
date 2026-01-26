export type Letter = {
  id: number;
  content: string;
  isLiked: boolean;
  receiveAt: string;
  createdAt: string;
  fromId: number;
  fromName: string;
  fromBgColor: string;
  fromFontColor: string;
  folderId: number;
};

export type LetterListResponse = {
  success: boolean;
  code: string;
  message: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Letter[];
  };
};
