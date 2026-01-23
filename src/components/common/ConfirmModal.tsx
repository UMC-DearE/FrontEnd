interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  titleClassName?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  titleClassName,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative flex w-[393px] min-h-screen items-center justify-center bg-[#B0B0B0]">
        <div className="h-[151px] w-[294px] rounded-[17px] bg-white px-[18px] pt-[26px] pb-[20px]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">
              <p
                className={`w-[257.44px] text-center text-[16px] font-semibold ${
                  titleClassName ?? 'text-black'
                }`}
              >
                {title}
              </p>
              {description ? (
                <p className="w-[257.44px] text-center text-[13px] font-medium text-[#9D9D9F] cursor-pointer">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="flex gap-[14px]">
              <button
                type="button"
                onClick={onCancel}
                className="h-[38px] w-[122px] rounded-lg border border-[#E5E5E5] text-[14px] font-medium text-[#555557]"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="h-[38px] w-[122px] rounded-lg bg-[#111111] text-[14px] font-semibold text-white cursor-pointer"
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
