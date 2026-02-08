import { api } from '@/api/client';
import type {
  Folder,
  FolderListResponse,
  CreateFolderRequest,
  UpdateFolderRequest,
} from '@/types/folder';

export async function getFolderList(): Promise<Folder[]> {
  const res = await api.get<FolderListResponse>('/folders');
  return res.data.data.items;
}

export async function createFolder(body: CreateFolderRequest): Promise<void> {
  await api.post('/folders', body);
}

export async function updateFolder(folderId: number, body: UpdateFolderRequest): Promise<void> {
  await api.put(`/folders/${folderId}`, body);
}

export async function deleteFolder(folderId: number): Promise<void> {
  await api.delete(`/folders/${folderId}`);
}
