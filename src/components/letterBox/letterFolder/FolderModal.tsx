// 편지함 폴더 모달

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import type { FolderImageAction } from '@/types/folder';
import BottomSheet from '@/components/common/BottomSheet';
import resetIcon from '@/assets/letterPage/resetIcon.svg';
import plusIcon from '@/assets/letterPage/folderPlusIcon.svg';

type UploadImageResult = { imageId: number; url: string };

export type FolderModalResult = {
  folder_name: string;
  imageId: number | null;
  imageAction: FolderImageAction | null;
};

interface FolderModalProps {
  title?: string;
  initialName: string;
  initialImageUrl: string | null;
  initialImageId: number | null;
  onCancel: () => void;
  onConfirm: (data: FolderModalResult) => void;
  uploadImage: (
    file: File,
    dir: 'profile' | 'letter' | 'sticker' | 'folder'
  ) => Promise<UploadImageResult>;
  onImageDelete?: () => Promise<void>;
  currentFolderId?: number | null;
}

export default function FolderModal({
  title = '새 폴더 만들기',
  initialName = '',
  initialImageUrl = null,
  initialImageId = null,
  onCancel,
  onConfirm,
  uploadImage,
  onImageDelete,
  currentFolderId,
}: FolderModalProps) {
  const [folderName, setFolderName] = useState(initialName);
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl);
  const [imageId, setImageId] = useState<number | null>(initialImageId);
  const [isUploading, setIsUploading] = useState(false);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);

    const preview = URL.createObjectURL(file);
    objectUrlRef.current = preview;
    setImageUrl(preview);
    setImageId(null);

    setIsUploading(true);
    try {
      const res = await uploadImage(file, 'folder');
      setImageId(res.imageId);
      setImageUrl(res.url || preview);
    } catch (err) {
      console.error(err);
      setImageUrl(preview);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleImageDelete = async () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setImageUrl(null);
    setImageId(null);

    if (currentFolderId != null && onImageDelete) {
      await onImageDelete();
    }
  };

  const handleConfirm = () => {
    const name = folderName.trim();
    if (!name || isUploading) return;

    let imageAction: FolderImageAction | null = null;
    if (imageId != null && imageId !== initialImageId) {
      imageAction = 'CHANGE';
    } else if (imageId == null && initialImageId != null) {
      imageAction = 'DELETE';
    }

    onConfirm({ folder_name: name, imageId, imageAction });
  };

  const isFormValid = folderName.trim().length > 0 && !isUploading;

  return (
    <BottomSheet open onClose={onCancel} className="px-[20px]" contentClassName="gap-[20px]">
      <div className="flex flex-col items-center gap-[28px]">
        <p className="text-[16px] font-medium text-[#121212]">{title}</p>

        <div className="flex flex-col items-center gap-[8px]">
          <label className="cursor-pointer">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="h-[88px] w-[88px] rounded-[12px] object-cover"
                alt="folder-image"
                onError={() => {
                  setImageUrl(null);
                  setImageId(null);
                }}
              />
            ) : (
              <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[12px] bg-[#EBEDF0]">
                <img src={plusIcon} alt="plus-icon" className="h-[20px] w-[20px]" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {imageUrl && (
            <button
              type="button"
              onClick={handleImageDelete}
              className="flex h-[22px] cursor-pointer items-center gap-[6px] rounded-[11px] bg-[#FFEEE8] px-[10px]"
            >
              <img src={resetIcon} alt="reset-icon" className="h-[12px] w-[12px]" />
              <span className="text-[10px] font-semibold text-[#FF5F2F]">이미지삭제</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-[16px]">
        <input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          maxLength={6}
          placeholder="폴더 이름을 입력하세요 (최대 6자)"
          className={`h-[50px] w-full rounded-[10px] px-[16px] text-center text-[16px] font-medium text-[#121212] outline-none placeholder:text-[#CACBD1] ${
            folderName ? 'border border-black bg-white' : 'border border-transparent bg-[#F7F8F9]'
          }`}
        />

        <div className="flex gap-[21px]">
          <button
            type="button"
            onClick={onCancel}
            className="h-[50px] flex-1 cursor-pointer rounded-[10px] border-[1.2px] border-[#E7E8EB] bg-white text-[16px] font-medium text-[#737478]"
          >
            취소
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isFormValid}
            className={`h-[50px] flex-1 rounded-[10px] text-[16px] font-medium transition-colors ${
              isFormValid
                ? 'cursor-pointer bg-[#121212] text-white'
                : 'cursor-not-allowed bg-[#E7E8EB] text-[#FFFFFF]'
            }`}
          >
            {isUploading ? '업로드중' : '완료'}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
