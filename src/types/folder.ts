export type Folder = {
  id: number;
  name: string;
  imageUrl: string | null;
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
  name: string;
  imageId: number | null;
};

export type UpdateFolderRequest = {
  name: string;
  imageId: number | null;
};
