// 편지 상세 - 더보기 바텀 시트

import { useState } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import ConfirmModal from '@/components/common/ConfirmModal';
import MoreView from '@/components/letter/views/MoreView';

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
      <BottomSheet open={open} onClose={onClose} className="px-[20px]">
        <MoreView
          onAddToFolder={() => {
            onClose();
            onAddToFolder();
          }}
          onEdit={() => {
            onClose();
            onEdit();
          }}
          onRequestDelete={() => setConfirmDelete(true)}
        />
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
