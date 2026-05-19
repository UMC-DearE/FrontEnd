import { useEffect, useMemo, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import stickerIcon from '@/assets/homePage/stickerIcon.svg';
import bgIcon from '@/assets/homePage/bgIcon.svg';
import resetIcon from '@/assets/homePage/resetIcon.svg';

interface ProfileCustomSheetProps {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onPickStickerFile?: (file: File) => void;
  bgColor: string;
  onChangeBgColor: (color: string) => void;
  onPickerStateChange?: (isOpen: boolean) => void;
  onDeselectSticker?: () => void;
  onClickReset?: () => void;
}

const normalizeHex = (v: string) => {
  const t = v.trim();
  if (!t) return '#F7F8F9';
  const withHash = t.startsWith('#') ? t : `#${t}`;
  const ok = /^#[0-9A-Fa-f]{6}$/.test(withHash);
  return ok ? withHash : '#F7F8F9';
};

export default function ProfileCustomSheet({
  open,
  onPickStickerFile,
  bgColor,
  onChangeBgColor,
  onPickerStateChange,
  onDeselectSticker,
  onClickReset,
}: ProfileCustomSheetProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  const safeBgColor = useMemo(() => normalizeHex(bgColor), [bgColor]);

  const [hexDraft, setHexDraft] = useState(safeBgColor);

  useEffect(() => {
    setHexDraft(safeBgColor);
  }, [safeBgColor]);

  const handleClickSticker = () => {
    setShowPicker(false);
    onPickerStateChange?.(false);
    fileInputRef.current?.click();
  };

  const handleClickReset = () => {
    setShowPicker(false);
    onPickerStateChange?.(false);
    onClickReset?.();
  };

  const handleToggleBgPicker = () => {
    const next = !showPicker;
    setShowPicker(next);
    onPickerStateChange?.(next);

    if (next) {
      onDeselectSticker?.();
    }
  };

  const handleClosePicker = () => {
    setShowPicker(false);
    onPickerStateChange?.(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="relative w-full max-w-[440px] min-h-screen 
      overflow-hidden pointer-events-none"
      >
        <div className="pointer-events-auto fixed bottom-0 left-1/2 h-[126px] w-full max-w-[440px] -translate-x-1/2 bg-white">
          <div className="flex h-full flex-col items-center">
            <div className="mt-[20px] flex items-start justify-center gap-[54px]">
              <div className="flex flex-col items-center gap-[14px]">
                <button
                  type="button"
                  onClick={handleClickReset}
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-[#F4F5F6] cursor-pointer"
                >
                  <img className="w-[25px] h-[25px]" src={resetIcon} alt="bg-icon" />
                </button>
                <p className="w-[48px] text-center text-[14px] font-medium leading-[100%] text-[#555557]">
                  초기화
                </p>
              </div>

              <div className="flex flex-col items-center gap-[14px]">
                <button
                  type="button"
                  onClick={handleClickSticker}
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-[#F4F5F6] cursor-pointer"
                >
                  <img className="w-[24px] h-[24px]" src={stickerIcon} alt="sticker-icon" />
                </button>
                <p className="w-[37px] text-center text-[14px] font-medium leading-[100%] text-[#555557]">
                  스티커
                </p>
              </div>

              <div className="flex flex-col items-center gap-[14px]">
                <button
                  type="button"
                  onClick={handleToggleBgPicker}
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] bg-[#F4F5F6] cursor-pointer"
                >
                  <img className="w-[25px] h-[25px]" src={bgIcon} alt="bg-icon" />
                </button>
                <p className="w-[48px] text-center text-[14px] font-medium leading-[100%] text-[#555557]">
                  배경색
                </p>
              </div>
            </div>
          </div>
        </div>

        {showPicker && (
          <div className="absolute left-1/2 bottom-[235px] z-[60] -translate-x-1/2 pointer-events-auto">
            <div className="rounded-lg bg-white p-3 shadow-lg">
              <HexColorPicker color={safeBgColor} onChange={onChangeBgColor} />
              <div className="mt-2 flex items-center justify-between gap-2">
                <input
                  value={hexDraft}
                  onChange={(e) => setHexDraft(e.target.value)}
                  className="w-28 rounded border px-2 py-1 text-sm"
                />
                <button
                  onClick={() => {
                    onChangeBgColor(normalizeHex(hexDraft));
                    handleClosePicker();
                  }}
                  className="rounded bg-gray-100 px-3 py-1 text-sm"
                  type="button"
                >
                  선택
                </button>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setShowPicker(false);
            onPickerStateChange?.(false);
            onPickStickerFile?.(file);
            e.currentTarget.value = '';
          }}
        />
      </div>
    </div>
  );
}
