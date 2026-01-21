interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  cancelText = '취소',
  confirmText = '해제',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative flex w-[393px] min-h-screen items-center justify-center bg-[#B0B0B0]">
        <div className="h-[151px] w-[294px] rounded-[17px] bg-white px-[18px] pt-[26px] pb-[20px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col items-center gap-[8px]">
              <p className="text-center text-[16px] font-semibold text-primary">
                {title}
              </p>
              {description ? (
                <p className="text-center text-[12px] font-medium text-[#9D9D9F]">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="flex gap-[14px]">
              <button
                type="button"
                onClick={onCancel}
                className="h-[38px] w-[122px] rounded-[8px] border border-[#E6E7E9] text-[14px] font-normal text-primary"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="h-[38px] w-[122px] rounded-[8px] bg-primary text-[14px] font-medium text-white"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
