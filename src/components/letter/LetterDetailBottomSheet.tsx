// 편지 상세 - 더보기 바텀 시트

import { useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";

interface LetterDetailBottomSheetProps {
  open: boolean;
  inFolder: boolean;
  folderName?: string | null;
  onClose: () => void;
  onAddToFolder: () => void;
  onRemoveFromFolder: () => void;
  onDeleteLetter: () => void;
}

export default function LetterMoreBottomSheet({
  open,
  inFolder,
  folderName,
  onClose,
  onAddToFolder,
  onRemoveFromFolder,
  onDeleteLetter,
}: LetterDetailBottomSheetProps) {
  if (!open) return null;

  const [confirmRemoveFromFolderOpen, setConfirmRemoveFromFolderOpen] =
    useState(false);
  const [confirmDeleteLetterOpen, setConfirmDeleteLetterOpen] =
    useState(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="relative w-[393px] min-h-screen overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-[#B0B0B0] bg-opacity-60"
        />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white rounded-t-2xl py-[62px] gap-[40px] flex flex-col">
            <button
              onClick={() => {
                if (inFolder) {
                  setConfirmRemoveFromFolderOpen(true);
                } else {
                  onClose();
                  onAddToFolder();
                }
              }}
              className="w-full text-lg font-medium text-primary"
            >
              {inFolder ? "폴더에서 삭제" : "폴더에 저장"}
            </button>

            <button
              onClick={onClose}
              className="w-full text-lg font-medium text-primary"
            >
              편지 수정
            </button>

            <button
              onClick={() => setConfirmDeleteLetterOpen(true)}
              className="w-full text-lg font-medium text-[#FF1D0D]"
            >
              편지 삭제
            </button>
          </div>
        </div>

        {/* 폴더에서 삭제 확인 모달 */}
        <ConfirmModal
          open={confirmRemoveFromFolderOpen}
          title="폴더에서 삭제"
          description={
            folderName
              ? `'${folderName}' 폴더에서 삭제할까요?\n편지는 삭제되지 않아요`
              : "폴더에서 삭제할까요?\n편지는 삭제되지 않아요"
          }
          cancelText="취소"
          confirmText="삭제"
          onCancel={() => setConfirmRemoveFromFolderOpen(false)}
          onConfirm={() => {
            setConfirmRemoveFromFolderOpen(false);
            onClose();
            onRemoveFromFolder();
          }}
        />

        {/* 편지 삭제 확인 모달 */}
        <ConfirmModal
          open={confirmDeleteLetterOpen}
          title="편지 삭제"
          titleClassName="text-[#FF1D0D]"
          description={"편지를 삭제할 경우 되돌릴 수 없어요\n정말 삭제할까요?"}
          cancelText="취소"
          confirmText="삭제"
          onCancel={() => setConfirmDeleteLetterOpen(false)}
          onConfirm={() => {
            setConfirmDeleteLetterOpen(false);
            onClose();
            /* 편지 삭제 api 호출 */
            onDeleteLetter();
          }}
        />
      </div>
    </div>
  );
}




