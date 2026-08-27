import { api } from '@/api/http';
import type {
  Folder,
  FolderListResponse,
  FolderLetterResponse,
  UpdateFolderRequest,
  AvailableLettersParams,
  AvailableLettersResult,
  AvailableLettersResponse,
  AddLettersToFolderResult,
  AddLettersToFolderResponse,
} from '@/types/folder';
import { normalizeImageUrl } from '@/api/upload';

export async function getFolderList(): Promise<Folder[]> {
  const res = await api.get<FolderListResponse>('/folders');
  const items = res.data.data.items;

  return items.map((folder) => ({
    ...folder,
    imageUrl: folder.imageUrl ? normalizeImageUrl(folder.imageUrl) : folder.imageUrl,
  }));
}

export async function createFolder(folder_name: string, imageId: number | null): Promise<Folder> {
  const res = await api.post<{ data: Folder }>('/folders', { folder_name, imageId });
  const folder = res.data.data;

  return {
    ...folder,
    imageUrl: folder.imageUrl ? normalizeImageUrl(folder.imageUrl) : folder.imageUrl,
  };
}

export async function updateFolder(folderId: number, body: UpdateFolderRequest) {
  await api.patch(`/folders/${folderId}`, body);
}

export async function deleteFolder(folderId: number): Promise<void> {
  await api.delete(`/folders/${folderId}`);
}

export async function updateFolderOrders(folderIds: number[]): Promise<void> {
  await api.patch('/folders/orders', { foldersOrder: folderIds });
}

export async function addLetterToFolder(
  folderId: number,
  letterId: number
): Promise<FolderLetterResponse> {
  const res = await api.post<FolderLetterResponse>(`/folders/${folderId}/letters/${letterId}`);
  return res.data;
}

export async function removeLetterFromFolder(
  folderId: number,
  letterId: number
): Promise<FolderLetterResponse> {
  const res = await api.delete<FolderLetterResponse>(`/folders/${folderId}/letters/${letterId}`);
  return res.data;
}

export async function getAvailableLetters(
  params: AvailableLettersParams
): Promise<AvailableLettersResult> {
  const res = await api.get<AvailableLettersResponse>(`/folders/letters/unassigned`, {
    params,
  });
  return res.data.data;
}

export async function addLettersToFolder(
  folderId: number,
  letterIds: number[]
): Promise<AddLettersToFolderResult> {
  const res = await api.post<AddLettersToFolderResponse>(`/folders/${folderId}/letters`, {
    letterIds,
  });
  return res.data.data;
}
