import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import resetIcon from '@/assets/letterPage/resetIcon.svg';

interface FolderModalProps {
  title?: string;
  initialName?: string;
  initialImageUrl?: string | null;
  initialImageId?: number | null;
  onCancel: () => void;
  onConfirm: (data: {
    folder_name: string;
    image_id: number | null;
    previewUrl: string | null;
  }) => void;
}

export default function FolderModal({
  title = '새 폴더 만들기',
  initialName = '',
  initialImageUrl = null,
  initialImageId = null,
  onCancel,
  onConfirm,
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

    const nextUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextUrl;

    setIsUploading(true);

    setImageUrl(nextUrl);
    setImageId(null);

    setIsUploading(false);
    e.target.value = '';
  };

  const handleImageDelete = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setImageUrl(null);
    setImageId(null);
  };

  const handleConfirm = () => {
    const name = folderName.trim();
    if (!name || isUploading) return;
    onConfirm({ folder_name: name, image_id: imageId, previewUrl: imageUrl });
  };

  const isFormValid = folderName.trim().length > 0 && !isUploading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex w-[393px] min-h-screen items-center justify-center">
        <div
          className="relative w-[294px] rounded-[17px] bg-white p-[18px] transition-all duration-300"
          style={{ height: imageUrl ? '310px' : '272px' }}
        >
          <p className="absolute left-1/2 top-[18px] -translate-x-1/2 h-[19px] text-center text-[16px] font-semibold text-black">
            {title}
          </p>

          <div className="absolute left-1/2 top-[59px] -translate-x-1/2 flex justify-center">
            <label className="cursor-pointer">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className="h-[77px] w-[77px] rounded-xl object-cover"
                  alt="folder-image"
                />
              ) : (
                <div className="h-[77px] w-[77px] rounded-xl bg-[#E6E7E9]" />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          {imageUrl && (
            <button
              type="button"
              onClick={handleImageDelete}
              className="absolute left-1/2 top-[152px] h-[22px] w-[81px] -translate-x-1/2 cursor-pointer rounded-[11px] bg-[#FFEEE8]"
            >
              <img
                src={resetIcon}
                alt="reset-icon"
                className="absolute left-[10px] top-1/2 -translate-y-1/2"
              />
              <p className="absolute left-[25px] top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#FF5F2F]">
                이미지삭제
              </p>
            </button>
          )}

          <div className="absolute left-1/2 bottom-[72px] -translate-x-1/2 flex justify-center">
            <div className="relative">
              <p
                className={`pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 text-center text-[15px] font-medium text-[#C2C4C7] transition-opacity ${
                  folderName ? 'opacity-0' : 'opacity-100'
                }`}
              >
                폴더 이름을 입력하세요 (최대 6자)
              </p>

              <input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                maxLength={6}
                className="h-12 w-[258px] rounded-[9px] bg-[#F4F5F6] px-3 text-center text-[15px] outline-none"
              />
            </div>
          </div>

          <div className="absolute left-1/2 bottom-[18px] -translate-x-1/2 flex gap-[14px]">
            <button
              type="button"
              onClick={onCancel}
              className="h-[38px] w-[122px] cursor-pointer rounded-lg border border-[#E5E5E5] text-[14px] font-medium text-[#555557]"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={!isFormValid}
              style={{ backgroundColor: isFormValid ? '#111111' : '#DCDCDCCC' }}
              className="h-[38px] w-[122px] cursor-pointer rounded-lg text-[14px] font-semibold text-white transition-colors"
            >
              {isUploading ? '업로드중' : '완료'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
