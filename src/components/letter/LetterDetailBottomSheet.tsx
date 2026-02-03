// 편지 상세 - 더보기 바텀 시트

import { useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";

interface Props {
  open: boolean;
  // folder metadata object; null if not in folder
  folder?: { folderId: number; folderName: string } | null;
  onClose: () => void;
  onAddToFolder: () => void;
  onRemoveFromFolder: () => void;
  onDeleteLetter: () => void;
  onEdit: () => void;
}

export default function LetterDetailBottomSheet({
  open,
  folder,
  onClose,
  onAddToFolder,
  onRemoveFromFolder,
  onDeleteLetter,
  onEdit,
}: Props) {
  if (!open) return null;

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="relative w-[393px] min-h-screen">
        <button
          onClick={onClose}
          className="absolute inset-0 bg-black/40"
        />

        <div className="absolute bottom-0 w-full bg-white rounded-t-2xl py-[62px] flex flex-col gap-[40px]">
          <button
            onClick={() => {
              if (folder) setConfirmRemove(true);
              else {
                onClose();
                onAddToFolder();
              }
            }}
            className="w-full text-lg font-medium text-primary"
          >
            {folder ? "폴더에서 삭제" : "폴더에 저장"}
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
            className="w-full text-lg font-medium text-[#FF1D0D]"
            onClick={() => setConfirmDelete(true)}
          >
            편지 삭제
          </button>
        </div>
        
        <ConfirmModal
          open={confirmRemove}
          title="폴더에서 삭제"
          description={
            folder?.folderName
              ? `'${folder.folderName}' 폴더에서 삭제할까요?\n편지는 삭제되지 않아요`
              : "폴더에서 삭제할까요?\n편지는 삭제되지 않아요"
          }
          cancelText="취소"
          confirmText="삭제"
          onCancel={() => setConfirmRemove(false)}
          onConfirm={() => {
            setConfirmRemove(false);
            onClose();
            onRemoveFromFolder();
          }}
        />

        {/* 편지 삭제 확인 모달 */}
        <ConfirmModal
          open={confirmDelete}
          title="편지 삭제"
          titleClassName="text-[#FF1D0D]"
          description={"편지를 삭제할 경우 되돌릴 수 없어요\n정말 삭제할까요?"}
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





