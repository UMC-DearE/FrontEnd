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
      <div className="relative flex w-[393px] min-h-screen items-center justify-center bg-black/40">
        <div className="w-[294px] rounded-[17px] bg-white px-[18px] pt-[26px] pb-[20px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col items-center gap-2">
              <p
                className={`text-center text-base font-semibold ${
                  titleClassName ?? 'text-black'
                }`}
              >
                {title}
              </p>
              {description ? (
                <div className="text-center text-xs font-medium text-[#9D9D9F]">
                  {description
                    .split(/\r?\n/)
                    .map((line) => line.trim())
                    .map((line, idx) => (
                      <p key={idx} className={idx === 0 ? "" : "mt-1"}>
                        {line}
                      </p>
                    ))}
                </div>
              ) : null}
            </div>

            <div className="flex gap-[14px]">
              <button
                type="button"
                onClick={onCancel}
                className="h-[38px] w-[122px] rounded-lg border border-[#E5E5E5] text-sm font-normal text-[#555557]"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="h-[38px] w-[122px] rounded-lg bg-[#111111] text-sm font-medium text-white cursor-pointer"
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
