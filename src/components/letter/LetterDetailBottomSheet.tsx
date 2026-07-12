// 편지 상세 - 더보기 바텀 시트

import { useState } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
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
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <BottomSheet open={open} onClose={onClose} className="px-[20px] pb-[40px]" contentClassName="gap-[12px]">
        <div className="flex w-full flex-col items-center">
          {/* 폴더 이동으로 통일 (폴더에서 삭제는 이동 시트의 '선택 없음(전체)'로 처리) */}
          <button
            onClick={() => {
              onClose();
              onAddToFolder();
            }}
            className="flex h-[60px] w-full items-center justify-center text-[16px] font-medium text-[#121212]"
          >
            폴더 이동
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="flex h-[56px] w-full items-center justify-center text-[16px] font-medium text-[#121212]"
          >
            편지 수정
          </button>

          <button
            className="flex h-[60px] w-full items-center justify-center text-[16px] font-medium text-[#FF143B]"
            onClick={() => setConfirmDelete(true)}
          >
            편지 삭제
          </button>
        </div>
      </BottomSheet>

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
    </>
  );
}
