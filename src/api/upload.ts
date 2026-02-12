// 이미지 업로드는 다른 곳에서도 씀 -> 통일해서 쓸 필요(파일 분리함)

import { api } from './http';
import type { UploadImageResponse } from '@/types/upload';

export const normalizeImageUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return url.replace('${AWS_CLOUDFRONT_DOMAIN}', import.meta.env.VITE_CLOUDFRONT_BASE);
};

export const uploadImage = async (
  file: File,
  dir: 'profile' | 'letter' | 'sticker' | 'folder'
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dir', dir);

  const { data } = await api.post<UploadImageResponse>('/images', formData);

  if (data?.data?.url) {
    data.data.url = normalizeImageUrl(data.data.url);
  }

  return data;
};
