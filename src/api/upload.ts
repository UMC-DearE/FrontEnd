// 이미지 업로드는 다른 곳에서도 씀 -> 통일해서 쓸 필요(파일 분리함)

import { api } from './http';
import type { UploadImageResponse } from '@/types/upload';
import { compressImage, pickUploadPolicy } from '@/utils/image';

export const normalizeImageUrl = (url: string): string => {
  if (!url) return url;

  // 앞뒤 공백 및 쌍따옴표 제거
  let cleaned = url.trim().replace(/^"|"$/g, '');

  // 이미 절대경로면 그대로 반환
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) return cleaned;

  // CloudFront 도메인 치환
  return cleaned.replace('${AWS_CLOUDFRONT_DOMAIN}', import.meta.env.VITE_CLOUDFRONT_BASE);
};

export const uploadImage = async (
  file: File,
  dir: 'profile' | 'letter' | 'sticker' | 'folder'
): Promise<UploadImageResponse> => {
  // 업로드 정책 (dir에 따라 리사이즈 크기/품질 다르게 적용)
  const { maxSide, quality } = pickUploadPolicy(dir);

  // 이미지 파일 2MB 초과일 경우 압축 후 업로드
  const fileToUpload =
    file.type.startsWith('image/') && file.size > 2_000_000
      ? await compressImage(file, maxSide, quality)
      : file;

  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('dir', dir);

  const { data } = await api.post<UploadImageResponse>('/images', formData, {
    timeout: 60000, // 모바일 대용량 업로드 대비
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (data?.data?.url) {
    data.data.url = normalizeImageUrl(data.data.url);
  }

  return data;
};
