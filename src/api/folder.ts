import { api } from '@/api/client';
import type { Folder, FolderListResponse } from '@/types/folder';

export async function getFolderList(): Promise<Folder[]> {
  const res = await api.get<FolderListResponse>('/folders');
  return res.data.data.items;
}

export async function createFolder(folder_name: string, imageId: number | null): Promise<Folder> {
  const res = await api.post<{ data: Folder }>('/folders', { folder_name, imageId });
  return res.data.data;
}

export async function updateFolder(folderId: number, body: { name: string; imageId?: number }) {
  await api.patch(`/folders/${folderId}`, body);
}

export async function deleteFolder(folderId: number): Promise<void> {
  await api.delete(`/folders/${folderId}`);
}

export async function updateFolderOrders(folderIds: number[]): Promise<void> {
  await api.patch('/folders/orders', { foldersOrder: folderIds });
}
