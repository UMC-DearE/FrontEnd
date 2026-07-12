// 편지 상세 - 더보기 바텀 시트

import { useState } from 'react';
import ConfirmModal from '@/components/common/ConfirmModal';

interface Props {
  open: boolean;
  onClose: () => void;
  onAddToFolder: () => void;
  onDeleteLetter: () => void;
  onEdit: () => void;
}

export default function LetterDetailBottomSheet({
  open,
  onClose,
  onAddToFolder,
  onDeleteLetter,
  onEdit,
}: Props) {
  if (!open) return null;

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="relative w-full max-w-[440px] min-h-screen">
        <button onClick={onClose} className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-0 w-full bg-white rounded-t-2xl py-[62px] flex flex-col gap-[40px]">
          {/* 폴더 이동으로 통일 (폴더에서 삭제는 이동 시트의 '선택 없음(전체)'로 처리) */}
          <button
            onClick={() => {
              onClose();
              onAddToFolder();
            }}
            className="w-full text-lg font-medium text-primary"
          >
            폴더 이동
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="w-full text-lg font-medium text-primary"
          >
            편지 수정
          </button>

          <button
            className="w-full text-lg font-medium text-[#FF143B]"
            onClick={() => setConfirmDelete(true)}
          >
            편지 삭제
          </button>
        </div>

        {/* 편지 삭제 확인 모달 */}
        <ConfirmModal
          open={confirmDelete}
          title="편지 삭제"
          titleClassName="text-[#FF143B]"
          description={'편지를 삭제할 경우 되돌릴 수 없어요\n정말 삭제할까요?'}
          cancelText="취소"
          confirmText="삭제"
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            setConfirmDelete(false);
            onClose();
            onDeleteLetter();
          }}
        />
      </div>
    </div>
  );
}
