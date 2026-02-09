import { api } from '@/api/http';

type UploadImageResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    imageId: number;
    key: string;
    url: string;
  };
};

export async function uploadImage(file: File, dir: string) {
  const form = new FormData();
  form.append('file', file);
  form.append('dir', dir);

  const res = await api.post<UploadImageResponse>('/images', form);

  return {
    imageId: res.data.data.imageId,
    url: res.data.data.url,
  };
}
